import { runInAction } from "mobx";
import { AuthService } from "../services/AuthService";
import { LoginRequestDTO } from "../services/dto/request/LoginRequestDTO";
import { SignUpRequestDTO } from "../services/dto/request/SignUpRequestDTO";
import { AuthStore } from "../store/AuthStore";
import { IAuthStore } from "../store/IAuthStore";
import { IAuthDomainStore } from "./IAuthDomainStore";

export class AuthDomainStore implements IAuthDomainStore {
  constructor(
    public authStore: IAuthStore = new AuthStore(),
    private readonly authService: AuthService = new AuthService()  ) {
    this.authStore.authenticated = !!this.getAccessToken();
  }

  async login(loginRequest: LoginRequestDTO) {
    try {
      const tokenPayloadDto = await this.authService.login(loginRequest);
      localStorage.setItem("access_token", tokenPayloadDto.access_token);
      
      runInAction(() => {
        this.setAuthenticated(true);
      })
    } catch (err) {
      runInAction(() => {
        this.setAuthenticated(false);
      })
    }
  }

  async signup(signUpRequest: SignUpRequestDTO) {
    await this.authService.signup(signUpRequest);
  }

  private setAuthenticated(authenticated: boolean) {
    runInAction(() => {
      this.authStore.authenticated = authenticated;
    })
  }

  getAccessToken() {
    return localStorage.getItem("access_token");
  }

  logOut() {
    localStorage.removeItem("access_token");
    return this.setAuthenticated(false);
  }

  isAuthenticated() {
    return runInAction(() => {
      this.authStore.authenticated;
    })
  }
}

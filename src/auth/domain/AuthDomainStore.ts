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
    readonly authService: AuthService = new AuthService()  ) {
    this.authStore.authenticated = !!this.getAccessToken();
  }

  async login(loginRequest: LoginRequestDTO, setErrorMessage: any) {
    try {
      const tokenPayloadDto: any = await this.authService.login(loginRequest);
      console.log(tokenPayloadDto);
      localStorage.setItem("access_token", tokenPayloadDto.access_token);
      
      // runInAction(() => {
      //   this.setAuthenticated(true);
      // })
      return this.authStore.authenticated = true;
    } catch (err: any) {
      setErrorMessage(err.error);
    }
  }

  async signup(signUpRequest: SignUpRequestDTO) {
    await this.authService.signup(signUpRequest);
  }

  private setAuthenticated(authenticated: boolean) {
    this.authStore.authenticated = authenticated;
  }

  getAccessToken() {
    return localStorage.getItem("access_token");
  }

  logOut() {
    localStorage.removeItem("access_token");
    return this.setAuthenticated(false);
  }

  isAuthenticated() {
    this.authStore.authenticated;
  }
}

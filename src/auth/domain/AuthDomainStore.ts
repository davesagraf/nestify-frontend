import { IUser } from "../../user/store/IUserStore";
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
      const response: any = await this.authService.login(loginRequest);
      localStorage.setItem("access_token", response.access_token);
      
      this.setAuthenticated(true);
      this.setCurrentUser(response.user);

      return response.user;
    } catch (err: any) {
      setErrorMessage(err.error);
    }
  }

  async signup(signUpRequest: SignUpRequestDTO, setErrorMessage: any, setErrorStatus: any) {
    try {
      await this.authService.signup(signUpRequest);
      this.setUserExists(false);
    } catch (err: any) {
      this.setUserExists(true);
      setErrorMessage(err.error);
      setErrorStatus(err.status);
    }
  }

  private setAuthenticated(authenticated: boolean) {
    this.authStore.authenticated = authenticated;
  }

  private setUserExists(userExists: boolean) {
    this.authStore.userExists = userExists;
  }

  private setCurrentUser(currentUser: IUser) {
    this.authStore.currentUser = currentUser;
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

  userExists(){
    this.authStore.userExists;
  }
}

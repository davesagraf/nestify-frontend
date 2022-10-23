import { makeAutoObservable } from "mobx";
import { LoginRequestDTO } from "../dto/request/LoginRequestDTO";
import { AuthService } from "../services/AuthService";

export class AuthStore {
  private authenticated = false;

  constructor(private readonly authService: AuthService) {
    makeAutoObservable(this);
    this.authenticated = !!this.getAccessToken();
  }

  async login(loginRequest: LoginRequestDTO) {
    try {
      const tokenPayloadDto = await this.authService.login(loginRequest);
      localStorage.setItem("access_token", tokenPayloadDto.access_token);
      this.setAuthenticated(true);
    } catch (err) {
      this.setAuthenticated(false);
    }
  }

  private setAuthenticated(authenticated: boolean) {
    this.authenticated = authenticated;
  }

  getAccessToken() {
    return localStorage.getItem("access_token");
  }

  logOut() {
    localStorage.removeItem('access_token');
    return this.setAuthenticated(false);
  }

  isAuthenticated() {
    return this.authenticated;
  }
}
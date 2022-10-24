import { AuthService } from "../services/AuthService";
import { LoginRequestDTO } from "../services/dto/request/LoginRequestDTO";
import { IAuthStore } from "../store/IAuthStore";

export interface IAuthDomainStore {
    authStore: IAuthStore;
    logOut(): void;
    login(loginRequest: LoginRequestDTO, setErrorMessage: any): void;
    readonly authService: AuthService;
};

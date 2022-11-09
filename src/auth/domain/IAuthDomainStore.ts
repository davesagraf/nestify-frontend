import { AuthService } from "../services/AuthService";
import { LoginRequestDTO } from "../services/dto/request/LoginRequestDTO";
import { IAuthStore } from "../store/IAuthStore";
import { SignUpRequestDTO } from "../services/dto/request/SignUpRequestDTO";

export interface IAuthDomainStore {
    authStore: IAuthStore;
    logOut(): void;
    login(loginRequest: LoginRequestDTO, setError: any): Promise<void>;
    signup(signUpRequest: SignUpRequestDTO, setError: any): Promise<void>;
    readonly authService: AuthService;
};

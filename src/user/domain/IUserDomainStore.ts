import { GetUserRequestDTO } from "../services/dto/request/GetUserRequestDTO";
import { UserService } from "../services/UserService";
import { IUserStore } from "../store/IUserStore";

export interface IUserDomainStore {
    userStore: IUserStore;
    getUserById(userId: string, setErrorMessage: any): Promise<GetUserRequestDTO>;
    getUserProfile(setErrorMessage: any): Promise<GetUserRequestDTO>;
    readonly userService: UserService;
}

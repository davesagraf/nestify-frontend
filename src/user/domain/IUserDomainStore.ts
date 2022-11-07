import { ILecture } from "../../lecture/store/ILectureStore";
import { GetUserRequestDTO } from "../services/dto/request/GetUserRequestDTO";
import { UpdateUserRequestDTO } from "../services/dto/request/UpdateUserRequestDTO";
import { UserService } from "../services/UserService";
import { IUser, IUserStore } from "../store/IUserStore";

export interface IUserDomainStore {
    userStore: IUserStore;
    getUserById(userId: string, setErrorMessage: any): Promise<GetUserRequestDTO>;
    getUserProfile(setErrorMessage: any): Promise<GetUserRequestDTO>;
    getAllUsers(setErrorMessage: any): Promise<GetUserRequestDTO[]>;
    getUserLectures(userId: any, setErrorMessage: any): Promise<Partial<ILecture[]>>;
    updateUser(userId: string, updateUserRequest: UpdateUserRequestDTO ): Promise<IUser>;
    readonly userService: UserService;
}

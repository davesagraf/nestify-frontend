import { ILecture } from "../../lecture/store/ILectureStore";
import { UpdateUserRequestDTO } from "../services/dto/request/UpdateUserRequestDTO";
import { UserService } from "../services/UserService";
import { IUser, IUserStore } from "../store/IUserStore";

export interface IUserDomainStore {
    userStore: IUserStore;
    getUserById(userId: string, setError: any): Promise<IUser>;
    getUserProfile(setError: any): Promise<IUser>;
    getAllUsers(setError: any): Promise<IUser[]>;
    getUserLectures(userId: any, setError: any): Promise<Partial<ILecture[]>>;
    updateUser(userId: string, updateUserRequest: UpdateUserRequestDTO, setError: any ): Promise<IUser>;
    deleteUser(userId: string, setError: any): Promise<void>;
    readonly userService: UserService;
}

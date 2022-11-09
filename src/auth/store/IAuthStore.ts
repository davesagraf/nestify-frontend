import { IUser } from "../../user/store/IUserStore";

export interface IAuthStore {
    authenticated: boolean;
    userExists: boolean;
    currentUser: IUser;
}

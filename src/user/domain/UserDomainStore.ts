import { IUserDomainStore } from "./IUserDomainStore";
import { IUser, IUserStore } from "../store/IUserStore";
import { UserService } from "../services/UserService";
import { UserStore } from "../store/UserStore";
import { GetUserRequestDTO } from "../services/dto/request/GetUserRequestDTO";

export class UserDomainStore implements IUserDomainStore {
  constructor(
    public userStore: IUserStore = new UserStore(),
    readonly userService: UserService = new UserService(),
  ) {}

  async getUserById(userId: string, setErrorMessage: any): Promise<GetUserRequestDTO> {
    try {
      const user = await this.userService.getUserById(userId);

      this.setInitialUser(user);

      return user;
    } catch (err: any) {
      setErrorMessage(err.error);
      return err.error;
    }
  }

  async getUserProfile(setErrorMessage: any): Promise<GetUserRequestDTO> {
    try {
      const user = await this.userService.getUserProfile();

      this.setInitialUser(user);
      
      return user;
    } catch (err: any) {
      setErrorMessage(err.error);
      return err.error;
    }
  }

  private setInitialUser(initialUser: IUser) {
    this.userStore.initialUser = initialUser;
  }
}

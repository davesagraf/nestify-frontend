import { IUserDomainStore } from "./IUserDomainStore";
import { IUser, IUserStore } from "../store/IUserStore";
import { UserService } from "../services/UserService";
import { UserStore } from "../store/UserStore";
import { GetUserRequestDTO } from "../services/dto/request/GetUserRequestDTO";
import { ILecture } from "../../lecture/store/ILectureStore";
import { UpdateUserRequestDTO } from "../services/dto/request/UpdateUserRequestDTO";

export class UserDomainStore implements IUserDomainStore {
  constructor(
    public userStore: IUserStore = new UserStore(),
    readonly userService: UserService = new UserService()
  ) {}

  async getUserById(
    userId: any,
    setErrorMessage: any
  ): Promise<GetUserRequestDTO> {
    try {
      const user = await this.userService.getUserById(userId);

      this.setUser(user);

      return user;
    } catch (err: any) {
      setErrorMessage(err.error);
      return err.error;
    }
  }

  async updateUser(
    userId: string,
    updateUserRequest: UpdateUserRequestDTO
  ): Promise<IUser> {
    try {
      const updatedUser = await this.userService.updateUser(
        userId,
        updateUserRequest
      );

      return updatedUser;
    } catch (err: any) {
      return err.error;
    }
  }

  async getUserLectures(
    userId: any,
    setErrorMessage: any
  ): Promise<Partial<ILecture[]>> {
    try {
      const thisUserLectures = await this.userService.getUserLectures(userId);

      this.setUserLectures(thisUserLectures);

      return thisUserLectures;
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

  async getAllUsers(setErrorMessage: any): Promise<GetUserRequestDTO[]> {
    try {
      const users = await this.userService.getAllUsers();
      this.setUsers(users);
      return users;
    } catch (err: any) {
      setErrorMessage(err.error);
      return err;
    }
  }

  private setInitialUser(initialUser: any) {
    this.userStore.initialUser = initialUser;
  }

  private setUsers(users: any) {
    this.userStore.users = users;
  }

  private setUserLectures(lectures: any) {
    this.userStore.userLectures = lectures;
  }

  private setUser(user: any) {
    this.userStore.user = user;
  }
}

import { IUserDomainStore } from "./IUserDomainStore";
import { IUser, IUserStore } from "../store/IUserStore";
import { UserService } from "../services/UserService";
import { UserStore } from "../store/UserStore";
import { GetUserRequestDTO } from "../services/dto/request/GetUserRequestDTO";
import { ILecture } from "../../lecture/store/ILectureStore";
import { UpdateUserRequestDTO } from "../services/dto/request/UpdateUserRequestDTO";
import { tryCatchWrap } from "../../utils/tryCatchWrap";

export class UserDomainStore implements IUserDomainStore {
  constructor(
    public userStore: IUserStore = new UserStore(),
    readonly userService: UserService = new UserService()
  ) {}

  async getUserById(
    userId: any,
    setError: any
  ): Promise<IUser> {
    return tryCatchWrap(async () => {
      const user = await this.userService.getUserById(userId);

      this.setUser(user);

      return user;
  }, setError)
  }

  async updateUser(
    userId: string,
    updateUserRequest: UpdateUserRequestDTO,
    setError: any
  ): Promise<IUser> {
    return tryCatchWrap(async () => {
      const updatedUser = await this.userService.updateUser(
        userId,
        updateUserRequest
      );
      return updatedUser;
  }, setError)
  }

  async deleteUser(userId: string, setError: any): Promise<void> {
    return tryCatchWrap(async () => {
      const newUserList = await this.userService.deleteUser(userId);
      this.setUsers(newUserList);
      return newUserList;
    }, setError)
  }

  async getUserLectures(
    userId: any,
    setError: any
  ): Promise<Partial<ILecture[]>> {
    return tryCatchWrap(async () => {
      const thisUserLectures = await this.userService.getUserLectures(userId);

      this.setUserLectures(thisUserLectures);

      return thisUserLectures;
  }, setError)
  }

  async getUserProfile(setError: any): Promise<IUser> {
    return tryCatchWrap(async () => {
      const user = await this.userService.getUserProfile();

      this.setInitialUser(user);

      return user;
    }, setError)
  }

  async getAllUsers(setError: any): Promise<IUser[]> {
    return tryCatchWrap(async () => {
      const users = await this.userService.getAllUsers();
      this.setUsers(users);
      return users;
    }, setError)
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

  setUser(user: IUser) {
    this.userStore.user = user;
  }
}

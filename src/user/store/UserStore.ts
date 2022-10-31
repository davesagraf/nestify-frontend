import { makeAutoObservable } from "mobx";
import { IUser, UserRole } from "./IUserStore";

const user: IUser = {
  id: 0,
  email: '',
  firstName: '',
  lastName: '',
  isActive: true,
  lectures: [],
  role: UserRole.ADMIN || UserRole.REGULAR,
  createdAt: '',
  updatedAt: ''
}

export class UserStore {
  public initialUser = user;
  public users = [];

  constructor() {
    makeAutoObservable(this);
  }
}

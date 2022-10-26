import { makeAutoObservable } from "mobx";
import { IUser, UserRole } from "./IUserStore";

const user: IUser = {
  id: 0,
  email: '',
  firstName: '',
  lastName: '',
  isActive: true,
  lectures: [],
  role: UserRole.REGULAR,
  createdAt: '',
  updatedAt: ''
}

export class UserStore {
  public initialUser = user;

  constructor() {
    makeAutoObservable(this);
  }
}

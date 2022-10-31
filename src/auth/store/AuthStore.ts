import { makeAutoObservable } from "mobx";
import { IUser, UserRole } from "../../user/store/IUserStore";

const currentUser: IUser = {
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

export class AuthStore {
  public authenticated = false;
  public userExists = false;
  public currentUser = currentUser;

  constructor() {
    makeAutoObservable(this);
  }
}

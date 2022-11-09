import { configure, makeAutoObservable } from "mobx";
import { IUser, UserRole } from "./IUserStore";
import {ILecture} from "../../lecture/store/ILectureStore";

const lectures: ILecture[] = [];
const user: IUser = {
  id: 0,
  email: '',
  firstName: '',
  lastName: '',
  isActive: true,
  lectures: lectures,
  role: UserRole.ADMIN || UserRole.REGULAR,
  createdAt: '',
  updatedAt: ''
}
const users: IUser[] = [];

export class UserStore {
  public initialUser = user;
  public users = users;
  public user = user;
  public userLectures = lectures;

  constructor() {
    makeAutoObservable(this);
    configure({
      enforceActions: "never",
    });
  };
};

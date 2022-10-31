import { ILecture } from "../../lecture/store/ILectureStore";


export enum UserRole {
  ADMIN = "ADMIN",
  REGULAR = "REGULAR",
}

export interface IUser {
  id: number;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  lectures: ILecture[];
}

export interface IUserStore {
  initialUser: IUser;
  users: IUser[];
}

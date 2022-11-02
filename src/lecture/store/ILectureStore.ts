import { IUser, IUserStore } from "../../user/store/IUserStore";

export interface ILectureData {
  image: string;
  theme: string;
  links: string[];
}

export interface ILecture {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  content: string;
  data: ILectureData;
  users: IUserStore[];
}

export interface ILectureStore {
  lectures: ILecture[];
  lecture: ILecture;
  lectureUsers: IUser[];
}

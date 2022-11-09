import { IUser, IUserStore } from "../../user/store/IUserStore";

export interface ILectureData {
  image: string;
  theme: string;
  links: string[] | string;
}

export interface ILecture {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  content: string;
  data: ILectureData;
  users: IUser[];
}

export interface ILectureStore {
  lectures: ILecture[];
  lecture: ILecture;
  lectureUsers: IUser[];
  emptyLecture: ILecture;
}

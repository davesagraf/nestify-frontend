import { IUserStore } from "../../user/store/IUserStore";

export interface ILectureData {
  image: string;
  theme: string;
  links: string[];
}

export interface ILectureStore {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  content: string;
  data: ILectureData;
  users: IUserStore[];
}

import { IUserStore } from "../../../../user/store/IUserStore";
import { ILectureData } from "../../../store/ILectureStore";

export interface CreateLectureRequestDTO {
  title: string;
  content: string;
  data?: ILectureData;
  users?: IUserStore[];
}

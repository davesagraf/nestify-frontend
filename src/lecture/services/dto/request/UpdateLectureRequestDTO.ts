import { IUser } from "../../../../user/store/IUserStore";
import { ILectureData } from "../../../store/ILectureStore";

export interface UpdateLectureRequestDTO {
  title: string;
  content: string;
  data?: ILectureData;
  users?: IUser[];
}

import { IUserStore, IUser } from "../../../../user/store/IUserStore";
import { ILectureData } from "../../../store/ILectureStore";

export interface GetLectureRequestDTO  {
    readonly id: number;
    readonly createdAt?: string;
    readonly updatedAt?: string;
    readonly title: string;
    readonly content: string;
    readonly data: ILectureData;
    readonly users: IUser[];
}

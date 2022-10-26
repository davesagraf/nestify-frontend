import { ILectureStore } from "../../../../lecture/store/ILectureStore";
import { UserRole } from "../../../store/IUserStore";

export interface GetUserRequestDTO {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly lectures: ILectureStore[];
  readonly role: UserRole;
  readonly isActive: boolean;
}

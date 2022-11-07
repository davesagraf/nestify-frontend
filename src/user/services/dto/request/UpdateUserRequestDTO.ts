import { UserRole } from "../../../store/IUserStore";

export interface UpdateUserRequestDTO {
  firstName: string;
  lastName: string;
  role: UserRole
}
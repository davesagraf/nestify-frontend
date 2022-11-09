import { LecturePage } from "../../lecture/view/LecturePage";
import { LecturesTable } from "../../lecture/view/LecturesTable";
import { AccountPage } from "../../user/view/AccountPage";
import { UserLectures } from "../../user/view/UserLectures";
import { UserPage } from "../../user/view/UserPage";
import { UsersTable } from "../../user/view/UsersTable";
import { ProfilePage } from "./ProfilePage";

export const authRoutes = [
  {
    path: "profile",
    element: ProfilePage,
  },
  {
    path: "account",
    element: AccountPage,
  },
  {
    path: "lectures",
    element: LecturesTable,
  },
  {
    path: "lectures/:id",
    element: LecturePage,
  },
  {
    path: "users",
    element: UsersTable,
  },
  {
    path: "users/:id",
    element: UserPage,
  },
  {
    path: "users/:id/lectures",
    element: UserLectures,
  },
];

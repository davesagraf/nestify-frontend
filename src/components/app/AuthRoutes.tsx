import { Route } from "react-router-dom";
import { Auth } from "../../auth/view/Auth";
import { ProfilePage } from "../../auth/view/ProfilePage";
import { LecturePage } from "../../lecture/view/LecturePage";
import { LecturesTable } from "../../lecture/view/LecturesTable";
import { UserPage } from "../../user/view/UserPage";

export const AuthRoutes = () => {
  let path;
  let element;
  if (path === "/profile") {
    return (element = <ProfilePage />);
  }
  if (path === "/lectures") {
    return (element = <LecturesTable />);
  }
  if (path === "/lectures/:id") {
    return (element = <LecturePage />);
  }
  if (path === "/account") {
    return (element = <UserPage />);
  }
  return (
    <>
      <Route path={path} element={element}></Route>
    </>
  );
};

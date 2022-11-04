import "./App.css";
import { Routes, Route } from "react-router-dom";
import { PublicPage } from "../../auth/view/PublicPage";
import { ProfilePage } from "../../auth/view/ProfilePage";
import { Layout } from "../Layout";
import { Auth } from "../../auth/view/Auth";
import { LoginPage } from "../../auth/view/LoginPage";
import { SignUp } from "../../auth/view/SignUp";
import { observer } from "mobx-react-lite";
import { useStores } from "../../StoreContext";
import { NotFound } from "../NotFound";
import { LecturesTable } from "../../lecture/view/LecturesTable";
import { LecturePage } from "../../lecture/view/LecturePage";
import { AccountPage } from "../../user/view/AccountPage";
import { UserPage } from "../../user/view/UserPage";
import { UsersTable } from "../../user/view/UsersTable";
import { UserLectures } from "../../user/view/UserLectures";
import { generateUUID } from "../../utils/uuid";

export const App = observer(() => {
  const { authDomain } = useStores();
  return (
    <>
      <Routes>
        <Route key={generateUUID()} path="/" element={<PublicPage authDomain={authDomain} />} />
        <Route key={generateUUID()} element={<Layout authDomain={authDomain} />}>
          <Route key={generateUUID()} path="/login" element={<LoginPage authDomain={authDomain} />} />
          <Route key={generateUUID()} path="/signup" element={<SignUp authDomain={authDomain} />} />
          <Route key={generateUUID()} path="/profile" element={<Auth><ProfilePage /></Auth>} />
          <Route key={generateUUID()} path="/account" element={<Auth><AccountPage/></Auth>} />
          <Route key={generateUUID()} path="/lectures" element={<Auth><LecturesTable /></Auth>} />
          <Route key={generateUUID()} path="/lectures/:id" element={<Auth><LecturePage /></Auth>} />
          <Route key={generateUUID()} path="/users" element={<Auth><UsersTable /></Auth>} />
          <Route key={generateUUID()} path="/users/:id" element={<Auth><UserPage /></Auth>} />
          <Route key={generateUUID()} path="/users/:id/lectures" element={<Auth><UserLectures/></Auth>} />
        </Route>
        <Route key={generateUUID()} path="*" element={<NotFound />} />
      </Routes>
    </>
  );
});

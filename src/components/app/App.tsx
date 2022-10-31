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
import { UserPage } from "../../user/view/UserPage";
import { NavBar } from "./NavBar";

export const App = observer(() => {
  const { authDomain } = useStores();
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<PublicPage authDomain={authDomain} />} />
        <Route element={<Layout authDomain={authDomain} />}>
          <Route path="/login" element={<LoginPage authDomain={authDomain} />} />
          <Route path="/signup" element={<SignUp authDomain={authDomain} />} />
          <Route path="/profile" element={<Auth><ProfilePage /></Auth>} />
          <Route path="/account" element={<Auth><UserPage /></Auth>} />
          <Route path="/lectures" element={<Auth><LecturesTable /></Auth>} />
          <Route path="/lectures/:id" element={<Auth><LecturePage /></Auth>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
});

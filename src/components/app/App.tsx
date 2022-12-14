import "./App.css";
import { Routes, Route } from "react-router-dom";
import { PublicPage } from "../../auth/view/PublicPage";
import { Layout } from "../Layout";
import { Auth } from "../../auth/view/Auth";
import { LoginPage } from "../../auth/view/LoginPage";
import { SignUp } from "../../auth/view/SignUp";
import { observer } from "mobx-react-lite";
import { useStores } from "../../StoreContext";
import { NotFound } from "../NotFound";
import { ProtectedRoutes } from "../../auth/view/ProtectedRoutes";

export const App = observer(() => {
  const { authDomain } = useStores();
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicPage authDomain={authDomain} />} />
        <Route element={<Layout authDomain={authDomain} />}>
          <Route path="/login" element={<LoginPage authDomain={authDomain} />} />
          <Route path="/signup" element={<SignUp authDomain={authDomain} />} />
          <Route path="/*" element={<Auth><ProtectedRoutes /></Auth>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
});

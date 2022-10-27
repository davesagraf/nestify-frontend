import "./App.css";
import { Routes, Route } from "react-router-dom";
import { PublicPage } from "../../auth/view/PublicPage";
import { ProtectedPage } from "../../auth/view/ProtectedPage";
import { Layout } from "../Layout";
import { Auth } from "../../auth/view/Auth";
import { LoginPage } from "../../auth/view/LoginPage";
import { SignUp } from "../../auth/view/SignUp";
import { observer } from "mobx-react-lite";
import { useStores } from "../../StoreContext";

export const App = observer(() => {
  const { authDomain } = useStores();
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicPage authDomain={authDomain} />} />
        <Route element={<Layout authDomain={authDomain} />}>
          <Route
            path="/login"
            element={<LoginPage authDomain={authDomain} />}
          />
          <Route path="/signup" element={<SignUp authDomain={authDomain} />} />
          <Route
            path="/profile"
            element={
              <Auth>
                <ProtectedPage />
              </Auth>
            }
          />
        </Route>
      </Routes>
    </>
  );
});

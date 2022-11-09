import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import { AuthStatus } from "../auth/view/AuthStatus";
import { generateUUID } from "../utils/uuid";
import { NavBar } from "./app/NavBar";

export const Layout = observer(({ authDomain }: any) => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/login" || location.pathname === "/profile" ? (
        <AuthStatus authDomain={authDomain} />
      ) : null}
      <NavBar key={generateUUID()}/>
      <Outlet />
    </>
  );
});

import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import { AuthStatus } from "../auth/view/AuthStatus";

export const Layout = observer(({ authDomain }: any) => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/login" || location.pathname === "/profile" ? (
        <AuthStatus authDomain={authDomain} />
      ) : null}
      <Outlet />
    </>
  );
});

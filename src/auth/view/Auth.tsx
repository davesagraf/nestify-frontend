import { useLocation, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStores } from "../../StoreContext";

export const Auth = observer(({ children }: { children: JSX.Element }) => {
  const { authDomain } = useStores();
  let location = useLocation();

  if (!authDomain.authStore.authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
});

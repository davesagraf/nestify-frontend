import { useLocation, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../StoreContext';
import { observer } from 'mobx-react-lite';

export const Auth = observer(({ children }: { children: JSX.Element }) => {
  const { authStore } = useContext(StoreContext);
  const authenticated = authStore.isAuthenticated();
  let location = useLocation();

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
});

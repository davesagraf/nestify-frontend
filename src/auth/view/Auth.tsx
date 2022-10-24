import { useLocation, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { AuthDomainStore } from '../domain/AuthDomainStore';

export const Auth = observer(({ children }: { children: JSX.Element }) => {
  const [authDomain] = useState(new AuthDomainStore());
  const authenticated = authDomain.authStore.authenticated;
  let location = useLocation();

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
});

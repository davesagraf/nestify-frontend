import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    //redirect to page which user tried to see before login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

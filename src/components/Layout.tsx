import { Grid } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { AuthStatus } from './auth/AuthStatus';

export const Layout: React.FC = () => {
  return (
    <>
      <Grid container sx={{ width: 400, height: 500 }}>
        <Grid item sx={{ width: 400, height: 50 }}>
          <AuthStatus />
        </Grid>
        <Grid item sx={{ width: 200, height: 50 }}>
          <Link to="/">Home Page</Link>
        </Grid>
        <Grid item sx={{ width: 200, height: 50 }}>
          <Link to="/profile">Profile Page</Link>
        </Grid>
      </Grid>
      <Outlet />
    </>
  );
};

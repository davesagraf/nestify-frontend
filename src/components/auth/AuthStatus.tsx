import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Box, Button, Typography } from '@mui/material';

export const AuthStatus: React.FC = () => {
  let auth = useAuth();
  let navigate = useNavigate();

  return (
    <>
      {!auth.user ? (
        <Box component={"div"} sx={{ width: 400, height: 300 }}>
          <Typography
            sx={{
              width: 400,
              height: 30,
            }}
          >
            You are not logged in.
          </Typography>
        </Box>
      ) : (
        <>
          <Box component={"div"} sx={{ width: 400, height: 300 }}>
            <Typography
              sx={{
                width: 400,
                height: 30,
              }}
            >
              Welcome back, {auth.user}!{" "}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                auth.signout(() => navigate("/"));
              }}
            >
              Sign Out
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

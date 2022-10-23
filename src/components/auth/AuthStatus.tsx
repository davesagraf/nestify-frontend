import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../StoreContext';
import { observer } from 'mobx-react-lite';
import { Box, Button, Typography } from '@mui/material';

export const AuthStatus: React.FC = observer(() => {
  const { authStore } = useContext(StoreContext);
  const authenticated = authStore.isAuthenticated();
  let navigate = useNavigate();
  let user = 'user';

  return (
    <>
      {!authenticated ? (
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
              Welcome back, {user}!{" "}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                authStore.logOut(); 
                navigate("/");
              }}
            >
              Sign Out
            </Button>
          </Box>
        </>
      )}
    </>
  );
});

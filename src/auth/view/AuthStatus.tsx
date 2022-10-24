import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Button, Typography } from '@mui/material';
import { AuthDomainStore } from '../domain/AuthDomainStore';
import { StoreContext } from '../../StoreContext';

export const AuthStatus: React.FC = observer(() => {
  const { authDomainStore } = useContext(StoreContext);
  const authenticated = authDomainStore.authStore.authenticated;
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
                authDomainStore.logOut(); 
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

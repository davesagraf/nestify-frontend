import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Box, Button, Typography } from '@mui/material';
import { IAuthDomainStore } from '../domain/IAuthDomainStore';

interface IStatusProperty {
  authDomain: IAuthDomainStore;
}

export const AuthStatus = observer(({authDomain}: IStatusProperty) => {
  let navigate = useNavigate();
  let user = 'user';
  return (
    <>
      {!authDomain.authStore.authenticated ? (
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
                authDomain.logOut(); 
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

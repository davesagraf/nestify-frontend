import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Button, Grid, Typography } from "@mui/material";
import { toJS } from "mobx";

export const AuthStatus = observer(({ authDomain }: any) => {
  let navigate = useNavigate();
  const user = toJS(authDomain.authStore.currentUser);
  return (
    <>
      {!authDomain.authStore.authenticated ? (
        <Grid
          container
          sx={{
            width: 1512,
            height: 150,
            display: "flex",
            top: 0,
            flexDirection: "column",
            justifyContent: "center",
            justifySelf: "center",
          }}>
          <Typography
            sx={{
              width: 1512,
              height: 30,
            }}>
            You are not logged in.
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid
            container
            sx={{
              width: 1512,
              height: 150,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              justifySelf: "center",
            }}>
            <Typography
              sx={{
                width: 1512,
                height: 30,
                textAlign: "center",
              }}>
              Welcome back, {user.firstName} {user.lastName}!{" "}
            </Typography>
            <Button
              sx={{
                width: 100,
                height: 50,
                transform: "translate(975px, -35px)",
                zIndex: "1301"
              }}
              variant="outlined"
              onClick={() => {
                authDomain.logOut();
                navigate("/");
              }}>
              Sign Out
            </Button>
          </Grid>
        </>
      )}
    </>
  );
});

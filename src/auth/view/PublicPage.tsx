import { Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export const PublicPage = observer(({ authDomain }: any) => {
  const authenticated = authDomain.authStore.authenticated;
  return (
    <>
      {!authenticated ? (
        <>
          <Grid
            container
            sx={{
              width: 1512,
              height: 350,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              justifySelf: "center",
            }}>
            <Typography
              sx={{
                width: 1512,
                height: 50,
              }}>
              Welcome to nestify!
            </Typography>
          </Grid>

          <Grid
            container
            sx={{
              width: 1512,
              height: 350,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              justifySelf: "center",
            }}>
            <Grid item sx={{ width: 1512, height: 50 }}>
              <Typography sx={{ width: 1512, height: 50 }}>
                Already registered?
              </Typography>
            </Grid>
            <Grid item sx={{ width: 1512, height: 50 }}>
              <Typography sx={{ width: 1512, height: 50 }}>
                Log in to your <Link to="/profile">Profile</Link>
              </Typography>
            </Grid>
            <Grid item sx={{ width: 1512, height: 50 }}>
              <Typography sx={{ width: 1512, height: 50 }}>
                Don't have an account yet?
              </Typography>
            </Grid>
            <Grid item sx={{ width: 1512, height: 50 }}>
              <Typography sx={{ width: 1512, height: 50 }}>
                Click <Link to="/signup">here</Link> to subscribe
              </Typography>
            </Grid>
          </Grid>
        </>
      ) : null}
    </>
  );
});

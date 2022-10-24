import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { AuthDomainStore } from "../domain/AuthDomainStore";

export const PublicPage: React.FC = observer(() => {
  const [authDomain] = useState(new AuthDomainStore());
  const authenticated = authDomain.authStore.authenticated;
  return (
    <>
      {!authenticated ? (
        <>
          <Grid container sx={{ width: 400, height: 300 }}>
            <Typography
              sx={{
                width: 400,
                height: 30,
              }}>
              Welcome to nestify!
            </Typography>
            <Grid item sx={{ width: 400, height: 50 }}>
              <Typography sx={{ width: 400, height: 30 }}>
                Don't have an account yet?
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ width: 400, height: 50, justifyContent: "space-evenly" }}>
            <Grid item sx={{ width: 40, height: 50 }}>
              <Typography sx={{ width: 40, height: 30 }}>Click</Typography>
            </Grid>
            <Grid item sx={{ width: 40, height: 50 }}>
              <Link to="/signup">
                <Typography sx={{ width: 40, height: 30 }}>here</Typography>
              </Link>
            </Grid>
            <Grid item sx={{ width: 40, height: 50 }}>
              <Typography sx={{ width: 40, height: 30 }}>to</Typography>
            </Grid>
            <Grid item sx={{ width: 40, height: 50 }}>
              <Typography sx={{ width: 40, height: 30 }}>subscribe</Typography>
            </Grid>
          </Grid>
        </>
      ) : null}
    </>
  );
});

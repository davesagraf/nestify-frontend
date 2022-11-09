import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Dialog, Grid, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { LoginRequestDTO } from "../services/dto/request/LoginRequestDTO";
import { IError } from "../../error/store/IErrorStore";

export const LoginPage = observer(({ authDomain }: any) => {
  const [error, setError] = useState<IError>();
  const [userData, setUserData] = useState<LoginRequestDTO>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, email: event.currentTarget.value });
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, password: event.currentTarget.value });
  };

  return (
    <>
      {!authDomain.authStore.authenticated ? (
        <>
          <Grid
            container
            sx={{
              width: 1512,
              height: 450,
            }}>
            <Dialog
              sx={{
                left: "556px",
                width: 400,
                height: 700,
                textAlign: "center",
              }}
              open={!authDomain.authStore.authenticated}>
              <Grid item sx={{ width: 304, height: 50, m: 2 }}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={userData.email}
                  variant="outlined"
                  placeholder="enter your email"
                  onChange={handleEmail}
                  sx={{ width: 304, height: "50px" }}
                  InputProps={{ style: { width: 300, height: 50 } }}
                />
              </Grid>
              <Grid item sx={{ width: 304, height: 50, m: 2 }}>
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={userData.password}
                  variant="outlined"
                  placeholder="enter your password"
                  onChange={handlePassword}
                  sx={{ width: 304, height: "50px" }}
                  InputProps={{ style: { width: 300, height: 50 } }}
                />
              </Grid>
              <Grid sx={{ width: 304, height: 50, m: 2 }}>
                <Button
                  variant="outlined"
                  sx={{ width: 100, height: 50 }}
                  onClick={() => {
                    authDomain.login(userData, setError).then(() => {
                      if (authDomain.authStore.authenticated === true) {
                        navigate(from, { replace: true });
                      }
                    });
                  }}>
                  Login
                </Button>
              </Grid>
              <Grid item sx={{ width: 304, height: 50, m: 2 }}>
                <Typography
                  sx={{ width: 300, height: 30 }}
                  component="p"
                  variant="inherit"
                  color="red">
                  {error?.error}
                </Typography>
              </Grid>
            </Dialog>
          </Grid>
          <Grid item sx={{ width: 1512, height: 50 }}>
            <Typography sx={{ width: 1512, height: 30 }}>
              Please, log in to view your profile page.
            </Typography>
          </Grid>
        </>
      ) : (
        navigate("/profile")
      )}
    </>
  );
});

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Dialog, Grid, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { SignUpRequestDTO } from "../services/dto/request/SignUpRequestDTO";

export const SignUp = observer(({ authDomain }: any) => {
  const [userData, setUserData] = useState<SignUpRequestDTO>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorStatus, setErrorStatus] = useState<null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, firstName: event.currentTarget.value });
  };

  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, lastName: event.currentTarget.value });
  };

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
              height: 982,
            }}>
            <Typography sx={{ width: 1512, height: 30, mt: -10 }}>
              Please, enter your details below to register at nestify!
            </Typography>
            <Dialog
              sx={{
                width: 400,
                height: 700,
                ml: "556px",
                textAlign: "center",
              }}
              open={!authDomain.authStore.authenticated}>
              <Grid item sx={{ width: 304, height: 50, m: 2 }}>
                <TextField
                  id="firstname"
                  name="firstname"
                  label="First Name"
                  type="text"
                  value={userData.firstName}
                  variant="outlined"
                  placeholder="enter your first name"
                  onChange={handleFirstName}
                  sx={{ width: 304, height: "50px" }}
                  InputProps={{ style: { width: 300, height: 50 } }}
                />
              </Grid>
              <Grid item sx={{ width: 304, height: 50, m: 2 }}>
                <TextField
                  id="lastname"
                  name="lastname"
                  label="Last Name"
                  type="text"
                  value={userData.lastName}
                  variant="outlined"
                  placeholder="enter your last name"
                  onChange={handleLastName}
                  sx={{ width: 304, height: "50px" }}
                  InputProps={{ style: { width: 300, height: 50 } }}
                />
              </Grid>
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
                  sx={{ width: 150, height: 50 }}
                  onClick={() => {
                    authDomain
                      .signup(userData, setErrorMessage, setErrorStatus)
                      .then(() => {
                        if (!authDomain.authStore.userExists) {
                          navigate("/login");
                        }
                      });
                  }}>
                  SIGN UP
                </Button>
              </Grid>
              <Grid item sx={{ width: 304, height: 50, m: 2 }}>
                {errorMessage ? (
                  <Typography component="p" variant="inherit" color="red">
                    {`oops...it's ${errorStatus}, baby, looks like ${errorMessage}`}
                  </Typography>
                ) : null}
              </Grid>
            </Dialog>
          </Grid>
        </>
      ) : (
        navigate("/profile")
      )}
    </>
  );
});

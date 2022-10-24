import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { LoginRequestDTO } from "../services/dto/request/LoginRequestDTO";

export const LoginPage = observer(({ authDomain }: any) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userData, setUserData] = useState<LoginRequestDTO>({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  let location = useLocation();

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
          <Typography>
            Please, log in to view your profile page at nestify{from}
          </Typography>
          <Dialog open={!authDomain.authStore.authenticated}>
            <Box component="div" sx={{ height: 300, width: 400, mt: 1 }}>
              <TextField
                id="email"
                name="email"
                label="email"
                type="email"
                value={userData.email}
                variant="outlined"
                placeholder="enter your email"
                onChange={handleEmail}
              />
              <TextField
                id="password"
                name="password"
                label="password"
                type="password"
                value={userData.password}
                variant="outlined"
                placeholder="enter your password"
                onChange={handlePassword}
              />
              <Button
                onClick={() => {
                  authDomain.login(userData, setErrorMessage).then(() => {
                    if (authDomain.authStore.authenticated === true) {
                      navigate(from, { replace: true });
                    }
                  });
                }}>
                Login
              </Button>
            </Box>
            <Typography component="p" variant="inherit" color="red">
              {errorMessage}
            </Typography>
          </Dialog>
        </>
      ) : null}
    </>
  );
});

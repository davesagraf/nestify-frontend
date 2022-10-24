import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { LoginRequestDTO } from "../services/dto/request/LoginRequestDTO";
import { IAuthDomainStore } from "../domain/IAuthDomainStore";
import { AuthDomainStore } from "../domain/AuthDomainStore";

export const LoginPage: React.FC = observer(() => {
  const [authDomain] = useState<IAuthDomainStore>(new AuthDomainStore());
  const authenticated = authDomain.authStore.authenticated;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userData, setUserData] = useState<LoginRequestDTO>({email: "", password: ""});
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
      {!authenticated ? (
        <>
          <Typography>
            Please, log in to view your profile page at nestify{from}
          </Typography>
          <Dialog open={!authenticated}>
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
                  authDomain.login(userData, setErrorMessage);
                }}>
                Login
              </Button>
            </Box>
          </Dialog>
          <Typography component="p" variant="inherit" color="red">
            {errorMessage}
          </Typography>
        </>
      ) : (
        navigate(from, { replace: true })
      )}
    </>
  );
});

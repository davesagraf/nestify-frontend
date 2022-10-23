import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../StoreContext";

export const LoginPage: React.FC = observer(() => {
  const { authStore } = useContext(StoreContext);
  const authenticated = authStore.isAuthenticated();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
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
                value={email}
                variant="outlined"
                placeholder="enter your email"
                onChange={handleEmail}
              />
              <TextField
                id="password"
                name="password"
                label="password"
                type="password"
                value={password}
                variant="outlined"
                placeholder="enter your password"
                onChange={handlePassword}
              />
              <Button
                onClick={() => {
                  authStore.login({ email, password });
                }}>
                Login
              </Button>
            </Box>
          </Dialog>
          <Typography component="p" variant="inherit" color="red">
            {errorMessage}
          </Typography>
        </>
      ) : navigate(from, { replace: true })}
    </>
  );
});

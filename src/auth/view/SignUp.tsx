import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { AuthDomainStore } from "../domain/AuthDomainStore";

export const SignUp: React.FC = observer(() => {
  const [authDomain] = useState(new AuthDomainStore());
  const authenticated = authDomain.authStore.authenticated;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.currentTarget.value);
  };

  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.currentTarget.value);
  };

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
          <Dialog open={!authenticated}>
            <Box component="div" sx={{ height: 300, width: 400, mt: 1 }}>
              <TextField
                id="firstname"
                name="firstname"
                label="First Name"
                type="text"
                value={firstName}
                variant="outlined"
                placeholder="enter your last name"
                onChange={handleFirstName}
              />
              <TextField
                id="lastname"
                name="lastname"
                label="Last Name"
                type="text"
                value={lastName}
                variant="outlined"
                placeholder="enter your last name"
                onChange={handleLastName}
              />
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
                sx={{ width: 60, height: 30 }}
                onClick={() => {
                  authDomain.signup({ firstName, lastName, email, password })
                  .then(() => navigate("/login"))
                  .catch((error) =>
                  alert(error.message)
                  )
                }}>
                SIGN UP
              </Button>
            </Box>
          </Dialog>
          <Grid container sx={{ width: 400, height: 300 }}>
            <Grid item sx={{ width: 400, height: 50 }}>
              <Typography sx={{ width: 400, height: 30 }}>Sign Up</Typography>
            </Grid>
          </Grid>
        </>
      ) : null}
    </>
  );
});

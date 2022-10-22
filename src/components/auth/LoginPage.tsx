import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';

export const LoginPage: React.FC = ({}) => {
  const [errrorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, email: event.currentTarget.value });
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, password: event.currentTarget.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data } = await axios.post(
      "http://localhost:3000/auth/login",
      userData
    );
    if (data.status === parseInt("401")) {
      setErrorMessage(data.response);
    } else {
      localStorage.setItem("token", data.access_token);
      // setIsLoggedIn(true)
      // navigate('/profile')
      auth.signin(userData.email, () => {
        //redirect to page which user tried to see before login
        navigate(from, { replace: true });
      });
    }
  };

  return (
    <>
      <Typography>
        Please, log in to view your profile page at nestify{from}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        sx={{ height: 300, width: 400, mt: 1 }}
      >
        <TextField
          id="email"
          name="email"
          label="email"
          variant="outlined"
          placeholder="enter your email"
          onChange={handleEmail}
        >
          {userData.email}
        </TextField>
        <TextField
          id="password"
          name="password"
          label="password"
          variant="outlined"
          placeholder="enter your password"
          onChange={handlePassword}
        >
          {userData.password}
        </TextField>
        <Button type="submit">Login</Button>
      </Box>
      <Typography component="p" variant="inherit" color="red">
        {errrorMessage}
      </Typography>
    </>
  );
};

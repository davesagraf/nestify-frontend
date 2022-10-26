import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { GetUserRequestDTO } from "../services/dto/request/GetUserRequestDTO";

export const UserPage = observer(({userDomain}: any) => {
  const [currentUser, setCurrentUser] = useState<GetUserRequestDTO>();
  const navigate = useNavigate();
  const location = useLocation();
  const {id} = useParams();
  return (
    <>
      <Typography sx={{ width: 400, height: 300 }}>
        This is profile of {currentUser?.firstName}
      </Typography>
    </>
  );
});

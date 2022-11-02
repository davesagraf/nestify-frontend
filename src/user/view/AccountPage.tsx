import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Link, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStores } from "../../StoreContext";

export const AccountPage = observer(() => {
  const {userDomain} = useStores();
  const user = userDomain.userStore.initialUser;
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();
  useEffect(() => {
    userDomain.getUserProfile(setErrorMessage);
  }, [])
  return (
    <>
    <Grid container sx={{width: 1512, height: 900, textAlign: "center"}}>
      <Grid item sx={{width: 500, height: 500, ml: '506px', mt: "100px"}}>
      <Typography sx={{ width: 500, height: 100, fontSize: 25 }}>
        Account
      </Typography>
      <Typography sx={{ width: 500, height: 50 }}>
        First Name: {user.firstName}
      </Typography>
      <Typography sx={{ width: 500, height: 50 }}>
        Last Name: {user.lastName}
      </Typography>
      <Typography sx={{ width: 500, height: 50 }}>
        Email: {user.email}
      </Typography>
      <Typography sx={{ width: 500, height: 50 }}>
        Role: {user.role}
      </Typography>
      <Typography sx={{ width: 500, height: 50 }}>
        Registered: {user.createdAt}
      </Typography>
      <Typography sx={{ width: 500, height: 50 }}>
        <Link sx={{cursor: "pointer"}} onClick={() => {navigate("/lectures")}}>lectures: </Link>
      </Typography>
        </Grid>
      </Grid>
    </>
  );
});

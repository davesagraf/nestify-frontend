import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useStores } from "../../StoreContext";

export const UserPage = observer(() => {
  const { id } = useParams();
  const { userDomain, authDomain } = useStores();
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();

  const currentUser = toJS(authDomain.authStore.currentUser);

  let user = toJS(userDomain.userStore.user);

  useEffect(() => {
    userDomain.getUserById(id, setErrorMessage);
  }, [user.id]);

  return (
    <>
      <Grid
        container
        sx={{
          width: 1512,
          height: 987,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
        <Card
          sx={{
            width: 550,
            height: 550,
            ml: "481px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <CardHeader
            sx={{ width: 490, height: 100 }}
            title={
              <Typography sx={{ width: 490, height: 50 }}>
                User # {user.id} details
              </Typography>
            }></CardHeader>
          <CardContent sx={{ width: 490, height: 300 }}>
            <Typography
              sx={{
                width: 490,
                height: 50,
              }}>
              First Name: {user.firstName}
            </Typography>
            <Typography
              sx={{
                width: 490,
                height: 50,
              }}>
              Last Name: {user.lastName}
            </Typography>
            <Typography
              sx={{
                width: 490,
                height: 50,
              }}>
              Email: {user.email}
            </Typography>
            <Typography
              sx={{
                width: 490,
                height: 50,
              }}>
              Role: {user.role}
            </Typography>
          </CardContent>
          <CardActions sx={{ width: 550, height: 50, p: 0 }}>
            <Button
              variant="contained"
              sx={{
                width: 175,
                height: 50,
                ml: "75px",
                mr: 6,
              }}
              onClick={() => {
                navigate(`/users/${id}/lectures`);
              }}>
              User Lectures
            </Button>
            <Button
              variant="contained"
              sx={{ width: 175, height: 50 }}
              onClick={() => {
                navigate("/users");
              }}>
              Go back to Users
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
});

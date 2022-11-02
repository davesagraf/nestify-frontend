import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Link,
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
  
  let user = toJS(userDomain.userStore.user)

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
            sx={{ width: 490, height: 150 }}
            title={
              <Typography sx={{ width: 490, height: 50 }}>
                User # {user.id} details
              </Typography>
            }></CardHeader>
          <CardContent sx={{ width: 490, height: 200 }}>
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
          <CardActions sx={{ width: 490, height: 50 }}>
          <Button
          variant="outlined"
          sx={{
            width: 100,
            height: 50,
            ml: 10
            }}
           onClick={() => {
            navigate(`/users/${id}/lectures`)
          }}>User Lectures</Button>
            <Typography sx={{ width: 490, height: 40 }}>
              <Link
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/users");
                }}>
                Go back to Users
              </Link>
            </Typography>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
});

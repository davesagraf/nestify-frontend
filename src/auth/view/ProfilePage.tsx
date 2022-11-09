import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Dialog, Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStores } from "../../StoreContext";
import { IdleTimer } from "../../utils/IdleTimer";
import { generateUUID } from "../../utils/uuid";
import { IError } from "../../error/store/IErrorStore";

export const ProfilePage = observer(() => {
  const { authDomain, userDomain } = useStores();
  const user  = userDomain.userStore.initialUser;
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState<IError>();

  const [counter, setCounter] = useState(30);
  const [isTimeout, setIsTimeout] = useState(false);

  useEffect(() => {
    const timer = new IdleTimer({
      timeout: 30,
      onTimeout: () => {
        setIsTimeout(true);
        setCounter(30);
      },
      onExpired: () => {
        setIsTimeout(false);
      },
    });

    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);

    if (isTimeout && counter === 0) {
      localStorage.removeItem("_expiredTime");
      authDomain.logOut();
      navigate("/");
    }

    return () => {
      timer.cleanUp();
    };
  }, [counter]);

  useEffect(() => {
    if (location.pathname === "/profile") {
      userDomain.getUserProfile(setError);
    }
  }, []);

  return (
    <>
      <Dialog
        PaperProps={{
          style: {
            width: 400,
            height: 150,
          },
        }}
        sx={{
          top: 10,
          left: 50,
          textAlign: "center",
        }}
        open={isTimeout}>
        <Grid item sx={{ width: 304, height: 50, m: 2, textAlign: "center" }}>
          <Typography sx={{ width: 300, height: 30, ml: 4 }}>
            after {counter} seconds you will be logged out
          </Typography>
        </Grid>
        <Grid item sx={{ width: 304, height: 50, m: 2, textAlign: "center" }}>
          <Button
            variant="outlined"
            sx={{ width: 150, height: 50, ml: 8 }}
            onClick={() => setIsTimeout(false)}>
            Keep me logged in
          </Button>
        </Grid>
      </Dialog>

      <Grid container sx={{ width: 1512, height: 982 }}>
        <>
        <Grid item sx={{width: 100, height: 200, display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}>
        <Button
          variant="outlined"
          sx={{
            width: 100,
            height: 50,
            ml: 10
            }}
           onClick={() => {
            navigate("/users")
          }}>ALL USERS</Button>
          <Button
          variant="outlined"
          sx={{
            width: 100,
            height: 50,
            ml: 10
            }}
           onClick={() => {
            navigate("/lectures")
          }}>ALL LECTURES</Button>
          <Button
          variant="outlined"
          sx={{
            width: 100,
            height: 50,
            ml: 10
            }}
           onClick={() => {
            navigate("/account")
          }}>MY ACCOUNT</Button>
          </Grid>
          <Typography
            sx={{
              width: 1512,
              height: 30,
              color: "white",
              fontSize: 16,
            }}>
            First name: {user.firstName}
          </Typography>
          <Typography
            sx={{
              width: 1512,
              height: 30,
              color: "white",
              fontSize: 16,
            }}>
            Last name: {user.lastName}
          </Typography>
          <Grid key={generateUUID()} container sx={{ width: 1512, height: 900 }}>
            {user.lectures.map((lecture) => (
                <Grid container key={generateUUID()} sx={{ width: 1512, height: 450 }}>
                  <Typography sx={{ width: 1512, height: 30, color: "white" }}>
                    {lecture.title}
                  </Typography>
                  <Typography sx={{ width: 1512, height: 30, color: "white" }}>
                    {lecture.content}
                  </Typography>
                  <Grid container sx={{ width: 1512, height: 100 }}>
                    <Grid item sx={{ width: 1512, height: 30 }}>
                      {lecture.data.image ? lecture.data.image : ""}
                    </Grid>
                    <Grid item sx={{ width: 1512, height: 30 }}>
                      <Typography sx={{ width: 1512, height: 30, color: "white" }}>
                    {lecture.data.links}
                  </Typography>
                    </Grid>
                    <Grid item sx={{ width: 1512, height: 30 }}>
                      {lecture.data.theme}
                    </Grid>
                  </Grid>
                </Grid>
            ))}
          </Grid>
          <Typography
            sx={{
              width: 1512,
              height: 30,
              color: "red",
              fontSize: 18,
            }}>
            {error?.error}
          </Typography>
        </>
      </Grid>
    </>
  );
});

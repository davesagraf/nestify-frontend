import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStores } from "../../StoreContext";
import { toJS } from "mobx";
import { IdleTimer } from "../../utils/IdleTimer";

export const ProtectedPage = observer(() => {
  const { authDomain, userDomain } = useStores();
  const user = toJS(userDomain.userStore.initialUser);
  const location = useLocation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [counter, setCounter] = useState(10);
  const [isTimeout, setIsTimeout] = useState(false);

  useEffect(() => {
    const timer = new IdleTimer({
      timeout: 10,
      onTimeout: () => {
        setIsTimeout(true);
        setCounter(10);
      },
      onExpired: () => {
        setIsTimeout(false);
      },
    });

    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);

    if (isTimeout === true && counter === 0) {
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
      userDomain.getUserProfile(setErrorMessage);
    }
  }, []);

  return (
    <>
      {isTimeout ? (
        <>
          <Typography>
            after {counter} seconds you will be logged out
          </Typography>
          <Button
            sx={{ width: 100, height: 30 }}
            onClick={() => setIsTimeout(false)}>
            Keep me logged in
          </Button>
        </>
      ) : null}
      <Grid container sx={{ width: 700, height: 1080 }}>
        <>
          <Typography
            sx={{
              width: 400,
              height: 30,
              color: "white",
              fontSize: 16,
            }}>
            First name: {user.firstName}
          </Typography>
          <Typography
            sx={{
              width: 400,
              height: 30,
              color: "white",
              fontSize: 16,
            }}>
            Last name: {user.lastName}
          </Typography>
          <Grid container sx={{ width: 400, height: 900 }}>
            {user.lectures.map((lecture, index) => (
              <>
                <Grid container key={index} sx={{ width: 400, height: 450 }}>
                  <Typography sx={{ width: 400, height: 30, color: "white" }}>
                    {lecture.title}
                  </Typography>
                  <Typography sx={{ width: 400, height: 30, color: "white" }}>
                    {lecture.content}
                  </Typography>
                  <Grid container sx={{ width: 400, height: 100 }}>
                    <Grid item sx={{ width: 400, height: 30 }}>
                      {lecture.data.image}
                    </Grid>
                    {lecture.data.links.map((link, idx) => (
                      <>
                        <Grid key={idx} item sx={{ width: 400, height: 25 }}>
                          {link}
                        </Grid>
                      </>
                    ))}
                    <Grid item sx={{ width: 400, height: 30 }}>
                      {lecture.data.theme}
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ))}
          </Grid>
          <Typography
            sx={{
              width: 400,
              height: 30,
              color: "red",
              fontSize: 18,
            }}>
            {errorMessage}
          </Typography>
        </>
      </Grid>
    </>
  );
});

import React, { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  AlertTitle,
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useStores } from "../../StoreContext";
import { generateUUID } from "../../utils/uuid";

export const LectureUsersList: React.FC<{
  usersChanged: boolean;
  setUsersChanged: SetStateAction<any>;
}> = observer(({ usersChanged, setUsersChanged }) => {
  const { id } = useParams();
  const { lectureDomain } = useStores();
  const [errorMessage, setErrorMessage] = useState<string>("");
  let lectureId: number = parseInt(`${id}`, 10);

  let lectureUsers = toJS(lectureDomain.lectureStore.lectureUsers);

  useEffect(() => {
    lectureDomain.getLectureUsers(`${id}`, setErrorMessage);
  }, []);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleDeleteLectureUsers = (event: React.MouseEvent<HTMLElement>) => {
    const userId = +event.currentTarget.id;

    let appliedUserIds = lectureUsers
      .filter((user) => user.id !== userId)
      .map((user) => user.id);

    lectureDomain.applyLecture(
      { lectureId: lectureId, userIds: appliedUserIds },
      setErrorMessage
    );
    setUsersChanged(true);
    handleOpenSnackbar();
  };

  return (
    <>
      <Snackbar
        sx={{ transform: "translate(31vw, -25vh)" }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="User deleted!"
        action={action}
      />

      <Grid container sx={{ width: 756, height: 350 }}>
        <Grid item sx={{ width: 378, height: 50, ml: "189px" }}>
          <Typography sx={{ mt: 2, mb: 2 }}>Lecture Users:</Typography>
        </Grid>
        <Grid item sx={{ width: 756, height: 300 }}>
          {lectureUsers.length !== 0 ? (
            <List
              key={generateUUID()}
              sx={{ width: 567, height: 300, ml: "94px" }}>
              {lectureUsers.map((user) => (
                <ListItem
                  key={generateUUID()}
                  secondaryAction={
                    <IconButton
                      key={generateUUID()}
                      id={`${user.id}`}
                      edge="end"
                      aria-label="delete"
                      onClick={handleDeleteLectureUsers}>
                      <DeleteIcon key={generateUUID()} />
                    </IconButton>
                  }>
                  <ListItemAvatar key={generateUUID()}>
                    <Avatar key={generateUUID()}>
                      <PersonIcon key={generateUUID()} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    key={generateUUID()}
                    primary={
                      user.firstName + " " + user.lastName
                    }></ListItemText>
                </ListItem>
              ))}
            </List>
          ) : (
            <Alert
              sx={{
                width: 378,
                ml: "189px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              severity="info"
              variant="standard">
              <AlertTitle sx={{ width: 189, ml: "94px" }}>
                No users yet
              </AlertTitle>
              No users applied to this Lecture yet. Click on Select Users button
              below.
            </Alert>
          )}
        </Grid>
      </Grid>
    </>
  );
});

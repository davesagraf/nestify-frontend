import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useStores } from "../../StoreContext";
import { LectureUsers } from "./LectureUsers";
import { ApplyLectureRequestDTO } from "../services/dto/request/ApplyLectureRequestDTO";
import { LectureUsersList } from "./LectureUsersList";

export const LecturePage = observer(() => {
  const { id } = useParams();
  const { lectureDomain } = useStores();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [usersChanged, setUsersChanged] = useState<boolean>(false);
  let lectureId: number = parseInt(`${id}`, 10);

  const [applyData, setApplyData] = useState<ApplyLectureRequestDTO>({
    lectureId: lectureId,
    userIds: [],
  });

  const navigate = useNavigate();

  let lecture = toJS(lectureDomain.lectureStore.lecture);

  useEffect(() => {
    lectureDomain.getLectureById(id, setErrorMessage);
  }, []);

  useEffect(() => {
    lectureDomain.getLectureUsers(`${id}`, setErrorMessage);
    setUsersChanged(false);
  }, [usersChanged]);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Select Lecture Users</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To select Users for this Lecture, please, click the Select Users
            button.
          </DialogContentText>
          <LectureUsers applyData={applyData} setApplyData={setApplyData} />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              width: 100,
              height: 50,
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            sx={{
              width: 100,
              height: 50,
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              lectureDomain.applyLecture(applyData, setErrorMessage);
              setUsersChanged(true);
              handleCloseDialog();
            }}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
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
          sx={{ width: 756, height: 900, textAlign: "center", ml: "378px" }}>
          <CardHeader
            sx={{ width: 378, height: 150, textAlign: "center", ml: "189px" }}
            title={
              <Typography sx={{ width: 378, height: 50, textAlign: "center" }}>
                {lecture.title}
              </Typography>
            }></CardHeader>
          <CardMedia
            sx={{ ml: "189px", width: "378px", height: "100px" }}
            component="img"
            image={lecture.data.image}
            alt="Lecture Picture"
          />
          <LectureUsersList usersChanged={usersChanged} setUsersChanged={setUsersChanged} />
          <CardContent sx={{ width: 756, height: 100, textAlign: "center" }}>
            <Typography
              sx={{
                width: 756,
                height: 100,
                textAlign: "center",
                color: "black",
              }}>
              {lecture.content}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              width: 756,
              height: 50,
              textAlign: "center",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}>
            <Button
              variant="outlined"
              sx={{
                width: 100,
                height: 50,
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={handleOpenDialog}>
              Select Users
            </Button>
            <Button
              variant="outlined"
              sx={{
                width: 100,
                height: 50,
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/lectures");
              }}>
              Go to Lectures
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
});

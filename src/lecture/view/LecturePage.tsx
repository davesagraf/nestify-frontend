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
import { generateUUID } from "../../utils/uuid";

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
        <DialogTitle sx={{ textAlign: "center" }}>
          Select Lecture Users
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            To select Users for this Lecture, please, click the Select Users
            button.
          </DialogContentText>
          <LectureUsers applyData={applyData} setApplyData={setApplyData} />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
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
            variant="contained"
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
          sx={{
            width: 756,
            height: 900,
            textAlign: "center",
            ml: "378px",
            p: 0,
          }}>
          <CardHeader
            sx={{
              width: 378,
              height: "50px",
              textAlign: "center",
              ml: "189px",
            }}
            title={
              <Typography sx={{ width: 378, height: 50, textAlign: "center" }}>
                {lecture.title}
              </Typography>
            }></CardHeader>
          <CardMedia
            sx={{ ml: "189px", width: "378px", height: "100px" }}
            component="img"
            image={lecture.data.image ? lecture.data.image : ""}
            alt="Lecture Picture"
          />
          <Grid item sx={{ width: 756, height: 350, overflowY: "scroll" }}>
            <LectureUsersList
              usersChanged={usersChanged}
              setUsersChanged={setUsersChanged}
            />
          </Grid>
          <CardContent
            sx={{
              width: 706,
              height: "250px",
              textAlign: "center",
              bgcolor: "#efefef",
              ml: "25px",
              mt: 0,
              mb: 0,
              p: 0,
              borderRadius: "7px",
            }}>
            <Typography
              key={generateUUID()}
              sx={{
                width: 706,
                height: "75px",
                textAlign: "center",
                color: "black",
                transform: "translate(0px, 45px)",
              }}>
              {lecture.content}
            </Typography>
            <Typography
              key={generateUUID()}
              sx={{
                width: 706,
                height: "100px",
                textAlign: "center",
                color: "black",
                transform: "translate(0px, 45px)",
              }}>
              {lecture.data.links}
            </Typography>
            <Typography
              key={generateUUID()}
              sx={{
                width: 706,
                height: "75px",
                textAlign: "center",
                color: "black",
                transform: "translate(0px, 15px)",
              }}>
              {lecture.data.theme}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              width: 756,
              height: "50px",
              textAlign: "center",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              mt: "25px",
            }}>
            <Button
              key={generateUUID()}
              variant="contained"
              sx={{
                width: 125,
                height: 50,
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={handleOpenDialog}>
              Select Users
            </Button>
            <Button
              key={generateUUID()}
              variant="contained"
              sx={{
                width: 125,
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

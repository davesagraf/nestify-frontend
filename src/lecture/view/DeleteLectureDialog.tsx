import React, { EventHandler, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useStores } from "../../StoreContext";
import { observer } from "mobx-react-lite";
import { ILecture } from "../store/ILectureStore";

export const DeleteLectureDialog: React.FC<{
  deleteDialogOpen: boolean;
  handleCloseDeleteDialog: EventHandler<any>;
  lecture: ILecture;
}> = observer(({ deleteDialogOpen, handleCloseDeleteDialog, lecture }) => {
  const { lectureDomain } = useStores();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const deApplyUsers = {
    lectureId: lecture.id,
    userIds: [],
  };

  const handleSaveDeleteLecture = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    await lectureDomain.applyLecture(deApplyUsers, setErrorMessage);
    await lectureDomain.deleteLecture(`${lecture.id}`, setErrorMessage);
    await lectureDomain.getLectures(setErrorMessage);
    handleCloseDeleteDialog(event);
  };

  return (
    <>
      <Dialog
        open={deleteDialogOpen}
        PaperProps={{
          style: {
            height: "300px",
            width: "500px",
            padding: 0,
            margin: 0,
          },
        }}
        sx={{
          width: 550,
          ml: "481px",
          textAlign: "center",
        }}>
        <DialogTitle
          sx={{ width: "500px", height: 50, ml: 0, mr: 0, pl: 0, pr: 0 }}>
          Delete Lecture
        </DialogTitle>
        <DialogContent
          sx={{ width: "500px", height: 200, ml: 0, mr: 0, pl: 0, pr: 0 }}>
          <DialogContentText sx={{ width: "500px", height: 50 }}>
            Are you sure you want to delete this Lecture?
          </DialogContentText>
          <Grid
            container
            sx={{
              width: "500px",
              height: 250,
              mt: 2,
              ml: 0,
              mr: 0,
              pl: 0,
              pr: 0,
            }}>
            <Grid item sx={{ width: "500px", height: 50 }}>
              <Typography sx={{ width: "500px", height: 35, fontSize: 20 }}>
                {lecture.title}
              </Typography>
              <Typography sx={{ width: "500px", height: 15, fontSize: 15 }}>
                {lecture.content}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            width: "500px",
            height: 50,
            ml: 0,
            mr: 0,
            pl: 0,
            pr: 0,
            pb: 2,
          }}>
          <Grid item sx={{ width: "500px", height: 50 }}>
            <Button
              sx={{ width: 100, height: 50, mr: 5 }}
              variant="contained"
              onClick={handleCloseDeleteDialog}>
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ width: 100, height: 50 }}
              onClick={handleSaveDeleteLecture}>
              Delete
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
});

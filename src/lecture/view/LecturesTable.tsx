import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertTitle,
  Button,
  Grid,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStores } from "../../StoreContext";
import { toJS } from "mobx";
import { UserRole } from "../../user/store/IUserStore";
import { generateUUID } from "../../utils/uuid";
import { CreateLectureForm } from "./CreateLectureForm";
import { EditLectureForm } from "./EditLectureForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteLectureDialog } from "./DeleteLectureDialog";
import { IError } from "../../error/store/IErrorStore";

export const LecturesTable = observer(() => {
  const { lectureDomain, userDomain, authDomain } = useStores();
  const [error, setError] = useState<IError>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  let lecture = toJS(lectureDomain.lectureStore.lecture);

  let lectureUsers = toJS(lectureDomain.lectureStore.lectureUsers);

  const navigate = useNavigate();

  const currentUser = toJS(authDomain.authStore.currentUser);
  let lectures = toJS(lectureDomain.lectureStore.lectures);

  const AlertMessage = () => {
    return (
      <>
        <Grid container sx={{ width: 1512, textAlign: "center" }}>
          <Alert severity="error" sx={{ ml: "551px" }}>
            <AlertTitle>Error</AlertTitle>
            FORBIDDEN RESOURCE — <strong>YOU ARE NOT ADMIN!</strong>
          </Alert>
        </Grid>
      </>
    );
  };

  useEffect(() => {
    if (currentUser.role !== UserRole.ADMIN) {
      {
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
      }
    }
    if (currentUser.role === UserRole.ADMIN) {
      lectureDomain.getLectures(setError);
    }
  }, [currentUser.role]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    lectureDomain.setLecture(lectureDomain.lectureStore.emptyLecture);
    setDialogOpen(false);
  };

  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleEditLecture = async (event: React.MouseEvent<HTMLElement>) => {
    lectureDomain.getLectureUsers(event.currentTarget.id, setError);
    await lectureDomain
      .getLectureById(+event.currentTarget.id, setError)
      .then(() => {
        handleOpenEditDialog();
      });
  };

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteLecture = async (event: React.MouseEvent<HTMLElement>) => {
    await userDomain
      .getUserById(+event.currentTarget.id, setError)
      .then(() => {
        handleOpenDeleteDialog();
      });
  };

  return (
    <>
      {currentUser.role === UserRole.ADMIN ? (
        <>
          <Button
            sx={{ width: 100, height: 50, m: 2 }}
            variant="outlined"
            onClick={handleOpenDialog}>
            Create Lecture
          </Button>
          {dialogOpen ? (
            <CreateLectureForm
              dialogOpen={dialogOpen}
              handleCloseDialog={handleCloseDialog}
              lectureData={lecture}
            />
          ) : null}
          {editDialogOpen ? (
            <EditLectureForm
              editDialogOpen={editDialogOpen}
              handleCloseEditDialog={handleCloseEditDialog}
              editLectureData={{...lecture, users: lectureUsers }}
              lecture={lecture}
            />
          ) : null}
          {deleteDialogOpen ? (
            <DeleteLectureDialog
              deleteDialogOpen={deleteDialogOpen}
              handleCloseDeleteDialog={handleCloseDeleteDialog}
              lecture={lecture}
            />
          ) : null}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1512 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Lecture</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Content</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Links</TableCell>
                  <TableCell align="center">Theme</TableCell>
                  <TableCell id="edit" align="center"></TableCell>
                  <TableCell id="delete" align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lectures.map((lecture: any) => (
                  <TableRow
                    key={generateUUID()}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align="center">
                      <Link
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate(`${lecture.id}`);
                        }}>
                        see lecture
                      </Link>
                    </TableCell>
                    <TableCell align="center">{lecture.title}</TableCell>
                    <TableCell align="center">{lecture.content}</TableCell>
                    <TableCell align="center">{lecture.data.image}</TableCell>
                    <TableCell align="center">{lecture.data.links}</TableCell>
                    <TableCell align="center">{lecture.data.theme}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        key={generateUUID()}
                        id={`${lecture.id}`}
                        edge="end"
                        aria-label="edit"
                        onClick={handleEditLecture}>
                        <EditIcon key={generateUUID()} />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        key={generateUUID()}
                        id={`${lecture.id}`}
                        edge="end"
                        aria-label="delete"
                        onClick={handleDeleteLecture}>
                        <DeleteIcon key={generateUUID()} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <AlertMessage />
      )}
    </>
  );
});

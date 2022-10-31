import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertTitle,
  Grid,
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

export const LecturesTable = observer(() => {
  const { lectureDomain, userDomain, authDomain } = useStores();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const user = toJS(userDomain.userStore.initialUser);
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
    if (user.role !== UserRole.ADMIN) {
      {
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
      }
    }
    if (user.role === UserRole.ADMIN) {
      lectureDomain.getLectures(setErrorMessage);
    }
  }, [user.role]);

  return (
    <>
      {user.role === UserRole.ADMIN ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1512 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Lecture</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Content</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Links</TableCell>
                  <TableCell align="center">Theme</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lectures.map((lecture: any, index: any) => (
                  <TableRow
                    key={index}
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

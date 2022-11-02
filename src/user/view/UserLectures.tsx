import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import { generateUUID } from "../../utils/uuid";

export const UserLectures = observer(() => {
  const { id } = useParams();
  const { userDomain, authDomain } = useStores();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const userId = id;

  const currentUser = toJS(authDomain.authStore.currentUser);

  let lectures = toJS(userDomain.userStore.userLectures);

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
      userDomain.getUserLectures(userId, setErrorMessage);
    }
  }, [currentUser.role]);

  return (
    <>
      {currentUser.role === UserRole.ADMIN ? (
        <>
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
                          if(location.pathname === `/users/${userId}/lectures`) {
                            navigate(`/lectures/${lecture.id}`, { replace: true });
                          }
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

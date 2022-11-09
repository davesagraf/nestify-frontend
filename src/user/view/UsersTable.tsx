import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertTitle,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditUserForm } from "./EditUserForm";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { IError } from "../../error/store/IErrorStore";

export const UsersTable = observer(() => {
  const { userDomain, authDomain } = useStores();
  const [error, setError] = useState<IError>();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  let user = toJS(userDomain.userStore.user);

  const navigate = useNavigate();

  const currentUser = toJS(authDomain.authStore.currentUser);

  let users = toJS(userDomain.userStore.users);

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
      userDomain.getAllUsers(setError);
    }
  }, [currentUser.role]);

  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleEditUser = async (event: React.MouseEvent<HTMLElement>) => {
    await userDomain
      .getUserById(+event.currentTarget.id, setError)
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

  const handleDeleteUser = async (event: React.MouseEvent<HTMLElement>) => {
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
          {editDialogOpen ? (
            <EditUserForm
              editDialogOpen={editDialogOpen}
              handleCloseEditDialog={handleCloseEditDialog}
              user={user}
            />
          ) : null}
          {deleteDialogOpen ? (
            <DeleteUserDialog
              deleteDialogOpen={deleteDialogOpen}
              handleCloseDeleteDialog={handleCloseDeleteDialog}
              user={user}
            />
          ) : null}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1512 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">User</TableCell>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Role</TableCell>
                  <TableCell id="edit" align="center"></TableCell>
                  <TableCell id="delete" align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user: any) => (
                  <TableRow
                    key={generateUUID()}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align="center">
                      <Link
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate(`${user.id}`);
                        }}>
                        see user
                      </Link>
                    </TableCell>
                    <TableCell align="center">{user.firstName}</TableCell>
                    <TableCell align="center">{user.lastName}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.role}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        key={generateUUID()}
                        id={`${user.id}`}
                        edge="end"
                        aria-label="edit"
                        onClick={handleEditUser}>
                        <EditIcon key={generateUUID()} />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        key={generateUUID()}
                        id={`${user.id}`}
                        edge="end"
                        aria-label="delete"
                        onClick={handleDeleteUser}>
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

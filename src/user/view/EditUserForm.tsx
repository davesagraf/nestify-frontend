import React, { EventHandler, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useStores } from "../../StoreContext";
import { observer } from "mobx-react-lite";
import { UpdateUserRequestDTO } from "../services/dto/request/UpdateUserRequestDTO";
import { IUser, UserRole } from "../store/IUserStore";

export const EditUserForm: React.FC<{
  editDialogOpen: boolean;
  handleCloseEditDialog: EventHandler<any>;
  user: IUser;
}> = observer(({ editDialogOpen, handleCloseEditDialog, user }) => {
  const [editUserData, setEditUserData] = useState<UpdateUserRequestDTO>({
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  });

  const { userDomain } = useStores();

  const [firstName, setFirstName] = useState<string>(editUserData.firstName);
  const [lastName, setLastName] = useState<string>(editUserData.lastName);
  const [role, setRole] = useState<UserRole>(editUserData.role);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
    setEditUserData({ ...editUserData, firstName: event.target.value });
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
    setEditUserData({ ...editUserData, lastName: event.target.value });
  };

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as any);
    setEditUserData({ ...editUserData, role: event.target.value as any });
  };

  const handleSaveEditUser = async (event: React.MouseEvent<HTMLElement>) => {
    await userDomain.updateUser(`${user.id}`, editUserData);
    await userDomain.getAllUsers(setErrorMessage);
    handleCloseEditDialog(event);
  };

  return (
    <>
      <Dialog
        open={editDialogOpen}
        PaperProps={{
          style: {
            height: "500px",
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
          Edit User
        </DialogTitle>
        <DialogContent
          sx={{ width: "500px", height: 400, ml: 0, mr: 0, pl: 0, pr: 0 }}>
          <DialogContentText sx={{ width: "500px", height: 50 }}>
            Change values & click Save to Edit User.
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
            <Grid
              item
              sx={{
                width: "500px",
                height: 50,
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                ml: "90px",
                mt: 2,
                mb: 2,
              }}>
              <TextField
                InputProps={{ style: { width: 150, height: 50 } }}
                onChange={handleFirstNameChange}
                id="firstName"
                label="First Name"
                value={firstName}
                type="text"
                variant="outlined"
              />
              <TextField
                InputProps={{ style: { width: 150, height: 50 } }}
                onChange={handleLastNameChange}
                id="lastName"
                label="Last Name"
                value={lastName}
                type="text"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              sx={{
                width: "500px",
                height: 150,
                mt: 5,
                ml: 0,
                mr: 0,
                pl: 0,
                pr: 0,
              }}>
              <FormControl sx={{ width: 125, height: 150 }}>
                <InputLabel id="select-role-label">Role</InputLabel>
                <Select
                  labelId="select-role"
                  id="select-role"
                  value={role}
                  label="Role"
                  onChange={handleRoleChange}>
                  <MenuItem value={UserRole.ADMIN}>{UserRole.ADMIN}</MenuItem>
                  <MenuItem value={UserRole.REGULAR}>
                    {UserRole.REGULAR}
                  </MenuItem>
                </Select>
              </FormControl>
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
              onClick={handleCloseEditDialog}>
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ width: 100, height: 50 }}
              onClick={handleSaveEditUser}>
              Save
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
});

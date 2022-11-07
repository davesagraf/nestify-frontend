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
import { IUser } from "../store/IUserStore";

export const DeleteUserDialog: React.FC<{
  deleteDialogOpen: boolean;
  handleCloseDeleteDialog: EventHandler<any>;
  user: IUser;
}> = observer(({ deleteDialogOpen, handleCloseDeleteDialog, user }) => {
  const { userDomain } = useStores();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSaveDeleteUser = async (event: React.MouseEvent<HTMLElement>) => {
    await userDomain.deleteUser(`${user.id}`, setErrorMessage);
    await userDomain.getAllUsers(setErrorMessage);
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
          Delete User
        </DialogTitle>
        <DialogContent
          sx={{ width: "500px", height: 200, ml: 0, mr: 0, pl: 0, pr: 0 }}>
          <DialogContentText sx={{ width: "500px", height: 50 }}>
            Are you sure you want to delete this User?
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
                {user.firstName} {user.lastName}
              </Typography>
              <Typography sx={{ width: "500px", height: 15, fontSize: 15 }}>
                {user.email}
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
              onClick={handleSaveDeleteUser}>
              Delete
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
});

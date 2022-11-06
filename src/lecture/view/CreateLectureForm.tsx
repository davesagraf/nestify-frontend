import React, {
  EventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { CreateLectureRequestDTO } from "../services/dto/request/CreateLectureRequestDTO";
import { useStores } from "../../StoreContext";
import { faker } from "@faker-js/faker";

let linkOptions = [
  faker.internet.url(),
  faker.internet.url(),
  faker.internet.url(),
  faker.internet.url(),
  faker.internet.url(),
  faker.internet.url(),
  faker.internet.url(),
];

export const CreateLectureForm: React.FC<{
  dialogOpen: boolean;
  handleCloseDialog: EventHandler<any>;
  lectureData: CreateLectureRequestDTO;
  setLectureData: SetStateAction<any>;
}> = ({ dialogOpen, handleCloseDialog, lectureData, setLectureData }) => {
  const { lectureDomain } = useStores();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [linkOption, setLinkOption] = useState<string[]>(linkOptions);

  useEffect(() => {
    setLectureData({
      ...lectureData,
      data: { ...lectureData.data, links: linkOption },
    });
  }, []);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLectureData({ ...lectureData, title: event.target.value });
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLectureData({ ...lectureData, content: event.target.value });
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLectureData({
      ...lectureData,
      data: { ...lectureData.data, theme: event.target.value },
    });
  };

  const handleLinksChange = (
    event: React.SyntheticEvent<Element>,
    values: string[]
  ) => {
    event.preventDefault();

    setLectureData({
      ...lectureData,
      data: {
        ...lectureData.data,
        links: values.map((value) => value).join(", ") || linkOption,
      },
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    if (event.currentTarget.files !== null) {
      for (const file of event.currentTarget.files) {
        setLectureData({
          ...lectureData,
          data: { ...lectureData.data, image: file.name },
        });
      }
    }
  };

  const handleCreateLecture = (event: React.MouseEvent<HTMLElement>) => {
    lectureDomain.createLecture(lectureData, setErrorMessage);
    handleCloseDialog(event);
  };

  return (
    <>
      <Dialog PaperProps={
        {
          style: {
            height: "500px",
            padding: 0
          }
        }
      } sx={{
        width: 756,
        ml: "378px",
        textAlign: "center"
        
      }} open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Create Lecture</DialogTitle>
        <DialogContent sx={{p: 0}}>
          <DialogContentText>
            Fill out the form to create a new Lecture.
          </DialogContentText>
          <Grid container sx={{width: 600, height: 450, m: 0}}>
          <Grid item sx={{width: 600, height: 50, display: "flex",
        flexDirection: "row", gap: "50px", ml: "100px", mt: 2, mb: 2}}>
          <TextField
            InputProps={{ style: { width: 175, height: 50 } }}
            onChange={handleTitleChange}
            id="title"
            label="Title"
            type="text"
            variant="outlined"
          />
          <TextField
            InputProps={{ style: { width: 175, height: 50 } }}
            onChange={handleContentChange}
            id="content"
            label="Content"
            type="text"
            variant="outlined"
          />
          </Grid>
          <Grid item sx={{width: 600, height: 50, display: "flex",
        flexDirection: "row", gap: "50px", ml: "100px", mt: 2, mb: 2}}>
          <TextField
            InputProps={{ style: { width: 175, height: 50 } }}
            onChange={handleThemeChange}
            id="theme"
            label="Theme"
            type="text"
            variant="outlined"
          />
          <Button 
          sx={{
            width: 175,
            height: 50
          }}
          variant="contained" component="label">
            Upload Image
            <input
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          </Grid>
          <Grid item sx={{width: 400, height: 150, ml: "100px", mt: 2, mb: 2}}>
          <Autocomplete
            onChange={(event, values) => handleLinksChange(event, values)}
            autoComplete
            autoSelect
            multiple
            limitTags={3}
            id="links"
            options={linkOptions}
            getOptionLabel={(option) => option}
            defaultValue={[linkOptions[0]]}
            renderInput={(params) => (
              <TextField sx={{width: 400, height: 50}} {...params} label="Links" placeholder="Links" />
            )}
            sx={{ width: "400px", height: "50px" }}
          />
          </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{width: 600, height: 50, gap: 1}}>
          <Button
          sx={{width: 95, height: 50}}
          variant="contained"
           onClick={handleCloseDialog}>Cancel</Button>
          <Button
          variant="contained"
          sx={{width: 95, height: 50, mr: 2}}
           onClick={handleCreateLecture}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

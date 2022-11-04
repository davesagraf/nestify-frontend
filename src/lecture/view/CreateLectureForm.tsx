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
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Create Lecture</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out the form to create a new Lecture.
          </DialogContentText>
          <TextField
            onChange={handleTitleChange}
            id="title"
            label="Title"
            type="text"
            variant="outlined"
          />
          <TextField
            onChange={handleContentChange}
            id="content"
            label="Content"
            type="text"
            variant="outlined"
          />
          <Button variant="contained" component="label">
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
          <TextField
            onChange={handleThemeChange}
            id="theme"
            label="Theme"
            type="text"
            variant="outlined"
          />

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
              <TextField {...params} label="Links" placeholder="Links" />
            )}
            sx={{ width: "500px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCreateLecture}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

import React, {
  EventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { UpdateLectureRequestDTO } from "../services/dto/request/UpdateLectureRequestDTO";
import { useStores } from "../../StoreContext";
import { ILecture } from "../store/ILectureStore";
import { faker } from "@faker-js/faker";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

const linkOptions = [...new Array(7)].map(() => faker.internet.url());

export const EditLectureForm: React.FC<{
  editDialogOpen: boolean;
  handleCloseEditDialog: EventHandler<any>;
  editLectureData: UpdateLectureRequestDTO;
  setEditLectureData: SetStateAction<any>;
  lecture: ILecture;
}> = observer(({
  editDialogOpen,
  handleCloseEditDialog,
  editLectureData,
  setEditLectureData,
  lecture,
}) => {
  const { lectureDomain } = useStores();

  const [title, setTitle] = useState(lecture.title);
  const [content, setContent] = useState(lecture.content);
  const [theme, setTheme] = useState(lecture.data.theme);
  const [image, setImage] = useState(lecture.data.image);
  let previousLinks = lecture.data.links.toString().split(", ")
  const [linkOption, setLinkOption] = useState<string[]>(linkOptions.concat(previousLinks));
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setEditLectureData({
      ...editLectureData,
      data: { ...editLectureData.data, links: linkOption },
    });
  }, []);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitle(event.target.value);
    setEditLectureData({ ...editLectureData, title: event.target.value });
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setContent(event.target.value);
    setEditLectureData({ ...editLectureData, content: event.target.value });
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTheme(event.target.value);
    setEditLectureData({
      ...editLectureData,
      data: { ...editLectureData.data, theme: event.target.value },
    });
  };

  const handleLinksChange = (
    event: React.SyntheticEvent<Element>,
    values: string[]
  ) => {
    event.preventDefault();
    setEditLectureData({
      ...editLectureData,
      data: {
        ...editLectureData.data,
        links: values.map((value) => value).join(", ") || linkOption,
      },
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    if (event.currentTarget.files !== null) {
      for (const file of event.currentTarget.files) {
        setEditLectureData({
          ...editLectureData,
          data: { ...editLectureData.data, image: file.name },
        });
      }
    }
  };

  const handleSaveEditLecture = async (event: React.MouseEvent<HTMLElement>) => {
    await lectureDomain.updateLecture(
    `${lecture.id}`,
     editLectureData,
     setErrorMessage
    );
    await lectureDomain.getLectures(setErrorMessage);
    handleCloseEditDialog(event);
  };

  return (
    <>
      <Dialog
        PaperProps={{
          style: {
            height: "500px",
            padding: 0,
          },
        }}
        sx={{
          width: 756,
          ml: "378px",
          textAlign: "center",
        }}
        open={editDialogOpen}
        onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Lecture</DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <DialogContentText>
            Change values & click Save button to edit Lecture.
          </DialogContentText>
          <Grid container sx={{ width: 600, height: 450, m: 0 }}>
            <Grid
              item
              sx={{
                width: 600,
                height: 50,
                display: "flex",
                flexDirection: "row",
                gap: "50px",
                ml: "100px",
                mt: 2,
                mb: 2,
              }}>
              <TextField
                InputProps={{ style: { width: 175, height: 50 } }}
                onChange={handleTitleChange}
                id="title"
                label="Title"
                type="text"
                variant="outlined"
                value={title}
              />
              <TextField
                InputProps={{ style: { width: 175, height: 50 } }}
                onChange={handleContentChange}
                id="content"
                label="Content"
                type="text"
                variant="outlined"
                value={content}
              />
            </Grid>
            <Grid
              item
              sx={{
                width: 600,
                height: 50,
                display: "flex",
                flexDirection: "row",
                gap: "50px",
                ml: "100px",
                mt: 2,
                mb: 2,
              }}>
              <TextField
                InputProps={{ style: { width: 175, height: 50 } }}
                onChange={handleThemeChange}
                id="theme"
                label="Theme"
                type="text"
                variant="outlined"
                value={theme}
              />
              {lecture.data.image ? (
                <>
                  <Box
                    sx={{ ml: "189px", width: "378px", height: "100px" }}
                    component="img"
                    src={lecture.data.image ? lecture.data.image : ""}
                    alt="Lecture Picture"
                  />
                  <Button
                    sx={{
                      width: 175,
                      height: 50,
                      transform: "translate(-170px, 50px)",
                    }}
                    variant="contained"
                    component="label">
                    Change Image
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/png, image/jpeg"
                      hidden
                      onChange={handleImageChange}
                    />
                  </Button>
                </>
              ) : (
                <Button
                  sx={{
                    width: 175,
                    height: 50,
                  }}
                  variant="contained"
                  component="label">
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
              )}
            </Grid>
            <Grid
              item
              sx={{ width: 400, height: 150, ml: "100px", mt: 2, mb: 2 }}>
              <Autocomplete
                onChange={(event, values) => handleLinksChange(event, values)}
                autoComplete
                autoSelect
                multiple
                limitTags={3}
                id="links"
                options={linkOption}
                getOptionLabel={(option) => option}
                defaultValue={lecture.data.links ? [...previousLinks] : [linkOption[0]]}
                renderInput={(params) => (
                  <TextField
                    sx={{ width: 400, height: 50 }}
                    {...params}
                    label="Links"
                    placeholder="Links"
                  />
                )}
                sx={{ width: "400px", height: "50px" }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ width: 600, height: 50, gap: 1 }}>
          <Button
            sx={{ width: 95, height: 50 }}
            variant="contained"
            onClick={handleCloseEditDialog}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ width: 95, height: 50, mr: 2 }}
            onClick={handleSaveEditLecture}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

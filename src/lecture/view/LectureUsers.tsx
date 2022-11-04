import { useEffect, useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useStores } from "../../StoreContext";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { ApplyLectureRequestDTO } from "../services/dto/request/ApplyLectureRequestDTO";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const LectureUsers: React.FC<{
  applyData: ApplyLectureRequestDTO;
  setApplyData: any;
}> = observer(({ applyData, setApplyData }) => {
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { userDomain, lectureDomain } = useStores();
  let users = toJS(userDomain.userStore.users);
  let names = users.map((user) => user.firstName + " " + user.lastName);
  let initialNames = toJS(lectureDomain.lectureStore.lectureUsers).map((user) => user.firstName + " " + user.lastName);
  
  const [personName, setPersonName] = useState<string[]>(initialNames);

  useEffect(() => {
    userDomain.getAllUsers(setErrorMessage);
  }, []);

  useEffect(() => {
    let appliedUserNames = users.filter((user) =>
      personName.includes(user.firstName + " " + user.lastName)
    );
    //timeout callback to set USER IDS, because setState is ""async""
    setTimeout(() => {
      let appliedUserIds = appliedUserNames.map((user) => user.id);
      setApplyData({ ...applyData, userIds: appliedUserIds });
    }, 10);
  }, [personName]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="select-users">Select Users</InputLabel>
        <Select
          labelId="select-users"
          id="select-users"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-users" label="Select Users" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}>
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
});

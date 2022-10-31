import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useStores } from "../../StoreContext";

export const LecturePage = observer(() => {
  const { id } = useParams();
  const { lectureDomain } = useStores();
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();

  let lecture = toJS(lectureDomain.lectureStore.lecture);

  useEffect(() => {
    lectureDomain.getLectureById(id, setErrorMessage);
  }, []);
  return (
    <>
    <Grid container sx={{width: 1512, height: 987, display: "flex", flexDirection: "column", justifyContent: "center"}}>
      <Card sx={{width: 550, height: 550, textAlign: "center", ml: "481px"}}>
        <CardHeader sx={{width: 490, height: 150, textAlign: "center"}} title={<Typography sx={{width: 490, height: 50, textAlign: "center"}}>{lecture.title}</Typography>}>
        </CardHeader>
        <CardMedia
        sx={{ml: "225px", width: "100px", height: "100px"}}
        component="img"
        image={lecture.data.image}
        alt="Lecture Picture"
      />
        <CardContent sx={{width: 490, height: 100, textAlign: "center"}}>
          <Typography sx={{width: 490, height: 100, textAlign: "center", color: "black"}}>{lecture.content}</Typography>
        </CardContent>
        <CardActions sx={{width: 490, height: 50, textAlign: "center"}}>
          <Typography sx={{width: 490, height: 40, textAlign: "center"}}>
            <Link
            sx={{cursor: "pointer"}}
              onClick={() => {
                navigate("/lectures");
              }}>
              Go to Lectures
            </Link>
          </Typography>
        </CardActions>
      </Card>
      </Grid>
    </>
  );
});

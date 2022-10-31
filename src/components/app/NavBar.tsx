import { useLocation, useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <Grid
        container
        sx={{
          width: 1512,
          height: 100,
          mt: 0,
          top: 10,
          position: "fixed",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <Button
          sx={{
            width: 100,
            height: 100,
            ml: 10,
            fontSize: "13px",
            zIndex: "1301",
            cursor: "pointer",
          }}
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}>
          BACK
        </Button>
        <Button
          sx={{
            width: 100,
            height: 100,
            mr: 10,
            fontSize: "13px",
            zIndex: "1301",
            cursor: "pointer",
          }}
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate(+1)}>
          FORWARD
        </Button>
      </Grid>
    </>
  );
};

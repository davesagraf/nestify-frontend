import { Grid, Typography } from "@mui/material";

export const NotFound = () => {
  return (
    <>
      <Grid
        container
        sx={{
          width: 1512,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
        <Typography sx={{ fontSize: 100, textAlign: "center" }}>404</Typography>
        <Typography sx={{ fontSize: 100, textAlign: "center" }}>
          PAGE NOT FOUND
        </Typography>
      </Grid>
    </>
  );
};

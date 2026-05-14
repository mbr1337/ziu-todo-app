import { Box, Typography } from "@mui/material";

function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <Typography variant="h1" component="h1" sx={{ fontSize: "6rem" }}>
        404
      </Typography>
    </Box>
  );
}

export default NotFound;

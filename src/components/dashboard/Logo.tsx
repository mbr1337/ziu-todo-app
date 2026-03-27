import { Box, Typography } from "@mui/material";

function Logo() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
      }}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="8" fill="black" />
        <path d="M19.1618 12H12.0588V19H19.1618V12Z" fill="white" />
        <path d="M28.2941 12H21.1912V19H28.2941V12Z" fill="white" />
        <path d="M19.1618 21H12.0588V28H19.1618V21Z" fill="white" />
      </svg>
      <Typography variant="h5">TaskFlow</Typography>
    </Box>
  );
}

export default Logo;

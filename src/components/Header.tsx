import { Avatar, Box, Stack, Typography } from "@mui/material";

function Header() {
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Box component={"img"} src="/static/images/logo.svg" alt="logo"></Box>
        <Typography variant="h5">TaskFlow</Typography>
      </Box>
      <Box>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </Box>
    </Stack>
  );
}

export default Header;

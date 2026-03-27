import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function AppHeader() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        flexGrow: 1,
        width: "auto",
        minWidth: 0,
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight={600} sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <IconButton color="inherit" aria-label="toggle theme">
          <LightModeIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="notifications">
          <NotificationsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

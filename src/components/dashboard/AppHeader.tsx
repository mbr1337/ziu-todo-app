import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LightModeIcon from "@mui/icons-material/LightMode";
import theme from "../../theme/theme";
import MenuIcon from "@mui/icons-material/Menu";
import type { SidebarProps } from "../../interfaces/dashboard.interfaces";

export default function AppHeader({ toggleDrawer }: SidebarProps) {
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack direction={"row"}>
      {isMdDown && (
        <IconButton onClick={toggleDrawer} aria-label="Open navigation menu" sx={{ display: "flex" }}>
          <MenuIcon />
        </IconButton>
      )}
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
        }}>
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
    </Stack>
  );
}

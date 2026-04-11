import {
  Drawer,
  Box,
  Typography,
  Avatar,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Toolbar,
  ListItemIcon,
  useMediaQuery,
} from "@mui/material";
import Logo from "./Logo";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskIcon from "@mui/icons-material/Task";
import SettingsIcon from "@mui/icons-material/Settings";

const DRAWER_WIDTH = 240;

const navItems = [
  { label: "Dashboard", icon: DashboardIcon, path: "/" },
  { label: "Zadania", icon: TaskIcon, path: "/todos" },
  { label: "Ustawienia", icon: SettingsIcon, path: "/settings" },
];

import theme from "../../theme/theme";
import type { SidebarProps } from "../../interfaces/dashboard.interfaces";

function Sidebar({ drawerOpen, toggleDrawer }: SidebarProps) {
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const drawerContent = (
    <>
      <Toolbar>
        <Logo />
      </Toolbar>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.label}
            component="a"
            href={item.path}
            sx={{
              "&.active": {
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
              },
            }}>
            <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.dark" }}>
          U
        </Avatar>
        <Typography variant="body2">Użytkownik</Typography>
      </Box>
    </>
  );

  return (
    <>
      <Drawer
        variant={isMdDown ? "temporary" : "permanent"}
        open={isMdDown ? drawerOpen : true}
        onClose={toggleDrawer}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          display: { xs: "block", md: "block" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}>
        {drawerContent}
      </Drawer>
    </>
  );
}

export default Sidebar;

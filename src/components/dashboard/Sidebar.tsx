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
  IconButton,
} from "@mui/material";
import Logo from "./Logo";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskIcon from "@mui/icons-material/Task";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";

const DRAWER_WIDTH = 240;

const navItems = [
  { label: "Dashboard", icon: DashboardIcon, path: "/" },
  { label: "Zadania", icon: TaskIcon, path: "/todos" },
  { label: "Ustawienia", icon: SettingsIcon, path: "/settings" },
];

type HeaderProps = {
  toggleDrawer: () => void;
};

function Sidebar({
  drawerOpen,
  toggleDrawer,
}: { drawerOpen: boolean } & HeaderProps) {
  return (
    <>
      <IconButton onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer
        // variant="permanent"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: DRAWER_WIDTH,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
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
              }}
            >
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
      </Drawer>
    </>
  );
}

export default Sidebar;

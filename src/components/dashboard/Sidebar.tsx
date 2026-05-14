import {
  Drawer,
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Toolbar,
  ListItemIcon,
  useMediaQuery,
  ButtonBase,
} from "@mui/material";
import Logo from "./Logo";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskIcon from "@mui/icons-material/Task";
import SettingsIcon from "@mui/icons-material/Settings";
import StorageIcon from '@mui/icons-material/Storage';

const DRAWER_WIDTH = 240;

const navItems = [
  { label: "Dashboard", icon: DashboardIcon, path: "/" },
  { label: "Zadania", icon: TaskIcon, path: "/todos" },
  { label: "Ustawienia", icon: SettingsIcon, path: "/settings" },
  { label: "The movie database", icon:  StorageIcon, path: "/movies" },
];

import theme from "../../theme/theme";
import type { SidebarProps } from "../../interfaces/dashboard.interfaces";
import { Link } from "react-router-dom";

function Sidebar({
  drawerOpen,
  toggleDrawer,
  openMultiStepForm,
}: SidebarProps) {
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const openUserMultiStepForm = () => {
    if (openMultiStepForm && typeof openMultiStepForm === "function") {
      openMultiStepForm();
    }
  };

  const drawerContent = (
    <>
      <Toolbar>
        <Logo />
      </Toolbar>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      <Box component="nav" aria-label="Nawigacja główna">
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  "&.active": {
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                  },
                }}>
                <ListItemIcon aria-hidden="true">{item.icon && <item.icon />}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <ButtonBase
        onClick={openUserMultiStepForm}
        aria-label="Otwórz profil użytkownika"
        sx={{
          width: "100%",
          borderRadius: 1,
          display: "flex",
          justifyContent: "flex-start",
          textAlign: "left",
          transition: "all 0.25s ease-in-out",
          "&:hover": {
            boxShadow: "0 0 4px 2px rgba(0, 0, 0, 0.2)",
          },
          "&:focus-visible": {
            outline: "2px solid",
            outlineColor: "primary.main",
            outlineOffset: "2px",
          },
        }}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}>
          <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.dark" }}>
            U
          </Avatar>
          <Typography variant="body2">Użytkownik</Typography>
        </Box>
      </ButtonBase>
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

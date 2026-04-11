import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import AppHeader from "./AppHeader";
import StatsGrid from "./StatsGrid";
import { useState } from "react";

const DRAWER_WIDTH = 240;

type DashboardLayoutProps = {
  children: React.ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      <Box
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}>
        <AppHeader toggleDrawer={toggleDrawer} />
        <Box sx={{ mt: 3 }}>
          <StatsGrid />
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;

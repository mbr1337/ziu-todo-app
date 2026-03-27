import { Box, Stack } from "@mui/material";
import { useState } from "react";
import Sidebar from "./Sidebar";
import AppHeader from "./AppHeader";
import StatsGrid from "./StatsGrid";

function DashboardLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        useFlexGap>
        <Sidebar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        <AppHeader />
      </Stack>
      <Box sx={{ mt: 3 }}>
        <StatsGrid />
      </Box>
    </Box>
  );
}

export default DashboardLayout;

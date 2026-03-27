import { Stack } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";
import StatsCard from "./StatsCard";

function DashboardLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        spacing={2}
        useFlexGap
      >
        <Sidebar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        <Header />
      </Stack>
      {/* <StatsCard /> */}
    </>
  );
}

export default DashboardLayout;

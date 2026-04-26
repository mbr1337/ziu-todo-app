import { Box, Modal } from "@mui/material";
import Sidebar from "./Sidebar";
import AppHeader from "./AppHeader";
import StatsGrid from "./StatsGrid";
import { useState } from "react";
import MultiStepForm from "./MultiStepForm";

const DRAWER_WIDTH = 240;

type DashboardLayoutProps = {
  children: React.ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMultiStepForm, setOpenMultiStepForm] = useState(false);

  const openUserMultiStepForm = () => {
    setOpenMultiStepForm(true);
  };
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        openMultiStepForm={openUserMultiStepForm}
      />
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

      <Modal
        open={openMultiStepForm}
        onClose={() => setOpenMultiStepForm(false)}
        aria-labelledby="multistep-form-title">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: 300,
            width: "50%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}>
          <MultiStepForm onClose={() => setOpenMultiStepForm(false)} />
        </Box>
      </Modal>
    </Box>
  );
}

export default DashboardLayout;

import { Box, Modal } from "@mui/material";
import Sidebar from "../dashboard/Sidebar";
import AppHeader from "../dashboard/AppHeader";
import { useState } from "react";
import MultiStepForm from "../dashboard/MultiStepForm";
import { MovieBrowser } from "./MovieBrowser";

const DRAWER_WIDTH = 240;

function MovieMain() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMultiStepForm, setOpenMultiStepForm] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Przejdź do treści głównej
      </a>
      <Box sx={{ display: "flex" }}>
        <Sidebar
          drawerOpen={drawerOpen}
          toggleDrawer={toggleDrawer}
          openMultiStepForm={() => setOpenMultiStepForm(true)}
        />
        <Box
          component="main"
          id="main-content"
          tabIndex={-1}
          sx={{
            flexGrow: 1,
            width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
            minHeight: "100vh",
          }}>
          <AppHeader toggleDrawer={toggleDrawer} />
          <Box sx={{ p: 3 }}>
            <MovieBrowser />
          </Box>
        </Box>
      </Box>

      <Modal
        open={openMultiStepForm}
        onClose={() => setOpenMultiStepForm(false)}
        aria-labelledby="multistep-form-title">
        <Box
          component="section"
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
    </>
  );
}

export default MovieMain;

import { Box, Modal } from "@mui/material";
import { useState, useCallback } from "react";
import Sidebar from "../dashboard/Sidebar";
import AppHeader from "../dashboard/AppHeader";
import MultiStepForm from "../dashboard/MultiStepForm";
import { MovieBrowser } from "./MovieBrowser";
import { FavoritesList } from "./FavoritesList";
import { ToastContainer } from "./ToastContainer";
import { useFavorites } from "../../hooks/useFavorites";
import { useToasts } from "../../hooks/useToasts";
import type { Movie } from "../../hooks/useFetchMovies";
import { plausible } from "../../utils/analytics";

const DRAWER_WIDTH = 240;

function MovieMain() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMultiStepForm, setOpenMultiStepForm] = useState(false);

  const { favorites, isFavorite, toggleFavorite, reorderFavorites } = useFavorites();
  const { toasts, addToast, removeToast } = useToasts();

  const handleToggleFavorite = useCallback(
    (movie: Movie) => {
      const adding = !isFavorite(movie.id);
      toggleFavorite(movie);
      addToast(
        adding
          ? `Dodano „${movie.title}" do ulubionych`
          : `Usunięto „${movie.title}" z ulubionych`
      );
    },
    [isFavorite, toggleFavorite, addToast]
  );

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
          openMultiStepForm={() => { plausible.trackEvent("Form Open", { props: { form: "registration" } }); setOpenMultiStepForm(true); }}
          sidebarExtra={
            <FavoritesList
              favorites={favorites}
              onReorder={reorderFavorites}
              onRemove={handleToggleFavorite}
            />
          }
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
            <MovieBrowser
              isFavorite={isFavorite}
              toggleFavorite={handleToggleFavorite}
            />
          </Box>
        </Box>
      </Box>

      <ToastContainer toasts={toasts} onRemove={removeToast} />

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

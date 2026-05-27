import { AnimatePresence, motion } from "framer-motion";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toastVariants } from "../../animations/variants";
import type { Toast } from "../../hooks/useToasts";

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: number) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1400,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
      role="status"
      aria-live="polite"
      aria-atomic="false">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit">
            <Paper
              elevation={4}
              sx={{
                px: 2,
                py: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 1,
                minWidth: 220,
                maxWidth: 360,
              }}>
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                {t.message}
              </Typography>
              <IconButton
                size="small"
                onClick={() => onRemove(t.id)}
                aria-label="Zamknij powiadomienie"
                sx={{
                  "&:focus-visible": {
                    outline: "2px solid",
                    outlineColor: "primary.main",
                    outlineOffset: "2px",
                  },
                }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Paper>
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
}

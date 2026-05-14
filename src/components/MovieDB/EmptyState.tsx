import { Box, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export function EmptyState() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        py: 8,
        color: "text.secondary",
      }}
      role="status"
      aria-live="polite"
      aria-atomic="true">
      <SearchOffIcon sx={{ fontSize: 64 }} aria-hidden="true" />
      <Typography variant="body1">Nie znaleziono filmów</Typography>
    </Box>
  );
}

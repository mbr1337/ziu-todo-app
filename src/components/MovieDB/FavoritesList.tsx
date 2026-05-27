import { Reorder } from "framer-motion";
import { Box, Typography, IconButton, Paper } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import type { Movie } from "../../hooks/useFetchMovies";

interface FavoritesListProps {
  favorites: Movie[];
  onReorder: (newOrder: Movie[]) => void;
  onRemove: (movie: Movie) => void;
}

export function FavoritesList({ favorites, onReorder, onRemove }: FavoritesListProps) {
  if (favorites.length === 0) return null;

  return (
    <Box component="section" aria-label="Ulubione filmy">
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Ulubione ({favorites.length})
      </Typography>
      <Reorder.Group
        axis="y"
        values={favorites}
        onReorder={onReorder}
        style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        {favorites.map((movie) => (
          <Reorder.Item key={movie.id} value={movie}>
            <Paper
              variant="outlined"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                cursor: "grab",
                userSelect: "none",
                "&:active": { cursor: "grabbing" },
              }}>
              <DragHandleIcon sx={{ color: "text.secondary", flexShrink: 0 }} aria-hidden="true" />
              <Typography variant="body2" sx={{ flexGrow: 1 }} noWrap>
                {movie.title}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
                {movie.release_date?.slice(0, 4)}
              </Typography>
              <IconButton
                size="small"
                onClick={() => onRemove(movie)}
                aria-label={`Usuń ${movie.title} z ulubionych`}
                sx={{
                  color: "error.main",
                  flexShrink: 0,
                  "&:focus-visible": {
                    outline: "2px solid",
                    outlineColor: "primary.main",
                    outlineOffset: "2px",
                  },
                }}>
                <FavoriteIcon fontSize="small" />
              </IconButton>
            </Paper>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </Box>
  );
}

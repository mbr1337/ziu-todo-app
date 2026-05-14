import { useState, useCallback } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Chip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import type { Movie } from "../../hooks/useFetchMovies";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

interface MovieCardProps {
  movie: Movie;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (movie: Movie) => void;
}

export function MovieCard({ movie, isFavorite, toggleFavorite }: MovieCardProps) {
  const [optimisticFav, setOptimisticFav] = useState<boolean | null>(null);
  const displayedFav = optimisticFav ?? isFavorite(movie.id);

  const handleToggle = useCallback(() => {
    setOptimisticFav(!displayedFav);
    try {
      toggleFavorite(movie);
      setOptimisticFav(null);
    } catch {
      setOptimisticFav(null);
    }
  }, [displayedFav, toggleFavorite, movie]);

  const year = movie.release_date?.slice(0, 4);

  return (
    <Card
      component="article"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.2s ease-in-out",
        "&:hover": { boxShadow: 6 },
      }}>
      {movie.poster_path ? (
        <CardMedia
          component="img"
          image={`${IMG_BASE}${movie.poster_path}`}
          alt={movie.title}
          sx={{ aspectRatio: "2/3", objectFit: "cover" }}
        />
      ) : (
        <Box
          aria-hidden="true"
          sx={{
            aspectRatio: "2/3",
            bgcolor: "grey.100",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <ImageNotSupportedIcon sx={{ fontSize: 48, color: "grey.400" }} />
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1, pb: 0 }}>
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          {movie.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
          {year && (
            <Typography variant="caption" color="text.secondary">
              {year}
            </Typography>
          )}
          <Chip
            icon={<StarIcon sx={{ fontSize: "12px !important", color: "warning.main" }} aria-hidden="true" />}
            label={movie.vote_average.toFixed(1)}
            size="small"
            sx={{ height: 20, fontSize: 11 }}
          />
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", pt: 0 }}>
        <IconButton
          onClick={handleToggle}
          aria-label={displayedFav ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
          aria-pressed={displayedFav}
          size="small"
          sx={{
            color: displayedFav ? "error.main" : "action.active",
            transition: "color 0.15s ease-in-out",
            "&:focus-visible": {
              outline: "2px solid",
              outlineColor: "primary.main",
              outlineOffset: "2px",
            },
          }}>
          {displayedFav ? (
            <FavoriteIcon fontSize="small" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
}

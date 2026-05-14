import { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Grid,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  CircularProgress,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useInfiniteMovies } from "../../hooks/useInfiniteMovies";
import { useDebounce } from "../../hooks/useDebounce";
import { useFavorites } from "../../hooks/useFavorites";
import { MovieCard } from "./MovieCard";
import { SkeletonCard } from "./SkeletonCard";
import { ErrorBanner } from "./ErrorBanner";
import { EmptyState } from "./EmptyState";

export function MovieBrowser() {
  const [searchInput, setSearchInput] = useState("");
  const debouncedQuery = useDebounce(searchInput, 400);
  const { isFavorite, toggleFavorite } = useFavorites();

  const {
    data,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isPlaceholderData,
  } = useInfiniteMovies(debouncedQuery);

  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 });
    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleObserver]);

  const movies = data?.pages.flatMap((p) => p.results) ?? [];

  return (
    <Box
      component="section"
      aria-label="Przeglądarka filmów"
      sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <FormControl fullWidth>
        <InputLabel htmlFor="movie-search">Szukaj filmów</InputLabel>
        <OutlinedInput
          id="movie-search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          label="Szukaj filmów"
          placeholder="Wpisz tytuł..."
          aria-required="false"
          inputProps={{ role: "searchbox" }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon aria-hidden="true" />
            </InputAdornment>
          }
        />
      </FormControl>

      {isError ? (
        <ErrorBanner
          message={
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (error as any)?.response?.data?.status_message ??
            (error as Error)?.message ??
            "Błąd podczas pobierania filmów"
          }
          onRetry={refetch}
        />
      ) : isLoading ? (
        <Grid container spacing={2}>
          {Array.from({ length: 12 }).map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <SkeletonCard />
            </Grid>
          ))}
        </Grid>
      ) : movies.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <Box
            aria-live="polite"
            aria-atomic="true"
            sx={{ opacity: isPlaceholderData ? 0.5 : 1, transition: "opacity 0.2s" }}>
            <Grid container spacing={2}>
              {movies.map((movie) => (
                <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <MovieCard
                    movie={movie}
                    isFavorite={isFavorite}
                    toggleFavorite={toggleFavorite}
                  />
                </Grid>
              ))}
              {isFetchingNextPage &&
                Array.from({ length: 4 }).map((_, i) => (
                  <Grid key={`sk-next-${i}`} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <SkeletonCard />
                  </Grid>
                ))}
            </Grid>
          </Box>

          {isFetchingNextPage && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
              <CircularProgress
                size={32}
                aria-label="Ładowanie kolejnych filmów"
              />
            </Box>
          )}

          {!hasNextPage && movies.length > 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center", py: 2 }}
              role="status"
              aria-live="polite">
              Wyświetlono wszystkie filmy
            </Typography>
          )}
        </>
      )}

      <div ref={sentinelRef} style={{ height: 1 }} aria-hidden="true" />
    </Box>
  );
}

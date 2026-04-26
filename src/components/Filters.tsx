import { Box, Button, Grid, useMediaQuery } from "@mui/material";
import theme from "../theme/theme";

function Filters({
  filtersArray,
  selectedFilter,
}: {
  filtersArray: any[];
  selectedFilter: string;
}) {
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box component="nav" aria-label="Filtry zadań">
      <Grid container spacing={2} sx={{ width: { md: "auto" } }}>
        {filtersArray.map((filter: any) => (
          <Grid
            size={{ xs: 6, sm: "auto" }}
            key={filter.id}>
            <Button
              variant="contained"
              sx={{ width: isMdDown ? "100%" : "auto" }}
              color={selectedFilter === filter.name ? "primary" : "secondary"}
              aria-pressed={selectedFilter === filter.name}
              onClick={filter.onClick}>
              {filter.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Filters;

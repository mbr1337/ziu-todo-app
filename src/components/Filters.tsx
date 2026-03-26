import { Button, Grid, useMediaQuery } from "@mui/material";
import theme from "../theme/theme";

function Filters({
  filtersArray,
  selectedFilter,
}: {
  filtersArray: any[];
  selectedFilter: string;
}) {
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  console.log(isMdDown);
  return (
    <Grid container spacing={2} sx={{ width: { md: "auto" } }}>
      {filtersArray.map((filter: any) => (
        <Grid
          size={{ xs: 6, sm: "auto" }}
          key={filter.id}>
          <Button
            variant="contained"
            sx={{ width: isMdDown ? "100%" : "auto" }}
            color={selectedFilter === filter.name ? "primary" : "secondary"}
            onClick={filter.onClick}>
            {filter.name}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}

export default Filters;

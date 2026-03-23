import { Box, Button, IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Filters({ filtersArray, selectedFilter }: { filtersArray: any[]; selectedFilter: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        justifyContent: "space-between",
      }}>
      <Stack direction={"row"} gap={2}>
        {filtersArray.map((filter: any) => (
          <Button
            variant="contained"
            color={selectedFilter === filter.name ? "primary" : "secondary"}
            key={filter.id}
            onClick={filter.onClick}>
            {filter.name}
          </Button>
        ))}
      </Stack>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}

export default Filters;

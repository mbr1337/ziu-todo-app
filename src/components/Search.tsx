import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import theme from "../theme/theme";

function Search() {
  return (
    <TextField
      id="search-input"
      variant="outlined"
      size="small"
      sx={{ width: "100%" }}
      placeholder="Szukaj zadań..."
      slotProps={{
        input: {
          "aria-label": "Szukaj zadań",
          sx: { p: 1, backgroundColor: theme.palette.background.searchBackground, borderRadius: 2 },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                aria-hidden
                sx={{ color: theme.palette.text.primary, opacity: 0.42 }}
              />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default Search;

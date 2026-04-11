import { createTheme } from "@mui/material";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    todoItem: true;
  }
}

declare module "@mui/material/styles" {
  interface TypeBackground {
    border: string;
    borderHover: string;
    searchBackground: string;
  }

  interface Palette {
    mutedPurple: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
    };
    softGreen: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
    };
    warmGray: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
    };
    blackAndWhite: {
      primary: string;
      secondary: string;
      primaryHover: string;
      background: string;
    };
  }

  interface PaletteOptions {
    mutedPurple?: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
    };
    softGreen?: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
    };
    warmGray?: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
    };
    blackAndWhite?: {
      primary: string;
      secondary: string;
      primaryHover: string;
    };
  }
  interface TypographyVariants {
    todoItem: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    todoItem?: React.CSSProperties;
  }
  interface TypographyPropsVariantOverrides {
    todoItem: true;
  }
}

const colors = {
  background: {
    border: "#E5E5E5",
    borderHover: "#C4C4C4",
    searchBackground: "#F5F5F5",
  },
  mutedPurple: {
    primary: "#553C9A",
    secondary: "#7C3AED",
    accent: "#C4B5FD",
    background: "#FAF5FF",
  },
  softGreen: {
    primary: "#2F855A",
    secondary: "#48BB78",
    accent: "#9AE6B4",
    background: "#F0FFF4",
  },
  warmGray: {
    primary: "#4A5568",
    secondary: "#A0AEC0",
    accent: "#E2E8F0",
    background: "#F7FAFC",
  },
  blackAndWhite: {
    primary: "#000000",
    secondary: "#FFFFFF",
    primaryHover: "#222222",
  },
  button: {
    secondaryBase: "#F5F5F5",
    secondaryText: "#666666",
    secondaryHover: "#E2E2E2",
  },
};

const theme = createTheme({
  palette: {
    background: {
      border: colors.background.border,
      borderHover: colors.background.borderHover,
      searchBackground: colors.background.searchBackground,
    },
    mutedPurple: colors.mutedPurple,
    softGreen: colors.softGreen,
    warmGray: colors.warmGray,
    blackAndWhite: colors.blackAndWhite,
  },
  typography: {
    h1: {
      fontWeight: 600,
      fontSize: "1.25rem clamp(1.25rem, 3vw, 2.5rem)",
      lineHeight: "30px",
    },
    todoItem: {
      fontWeight: "bold",
      fontSize: "clamp(0.875rem, 1,5vw, 1.25rem",
      lineHeight: "21px",
    },
    fontFamily: "Montserrat",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: colors.blackAndWhite.primary,
          color: colors.blackAndWhite.secondary,
          paddingLeft: 8,
          paddingRight: 8,
          paddingTop: 8,
          paddingBottom: 8,
          borderRadius: 8,
          fontWeight: 500,
          fontSize: "14px",
          transition: "background-color 0.3s ease-in-out",
          boxShadow: "none",
          lineHeight: 1.75,
          "&:hover": {
            backgroundColor: colors.blackAndWhite.primaryHover,
            boxShadow: "none",
          },
        },
        containedSecondary: {
          backgroundColor: colors.button.secondaryBase,
          color: colors.button.secondaryText,
          paddingLeft: 8,
          paddingRight: 8,
          paddingTop: 8,
          paddingBottom: 8,
          borderRadius: 8,
          fontWeight: 500,
          fontSize: "14px",
          transition: "background-color 0.3s ease-in-out",
          boxShadow: "none",
          lineHeight: 1.75,
          "&:hover": {
            backgroundColor: colors.button.secondaryHover,
            boxShadow: "none",
          },
        },
      },
    },
  },
});

export default theme;

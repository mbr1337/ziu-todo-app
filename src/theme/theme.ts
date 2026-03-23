import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypeBackground {
    border: string;
  }

  interface Palette {
    mutedPurple: { primary: string; secondary: string; accent: string, background: string };
    softGreen: { primary: string; secondary: string; accent: string, background: string };
    warmGray: { primary: string; secondary: string; accent: string, background: string };
    blackAndWhite: { primary: string; secondary: string; primaryHover: string, background: string };
  }

  interface PaletteOptions {
    mutedPurple?: { primary: string; secondary: string; accent: string, background: string };
    softGreen?: { primary: string; secondary: string; accent: string, background: string };
    warmGray?: { primary: string; secondary: string; accent: string, background: string };
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

const theme = createTheme({
  palette: {
    background: {
      border: "#E5E5E5",
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
  },
  typography: {
    h1: {
      fontWeight: 600,
      fontSize: "20px",
      lineHeight: "30px",
    },
    todoItem: {
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "21px",
    },
    fontFamily: 'Montserrat'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: "#000000",
          color: "#FFFFFF",
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
            backgroundColor: "#222222",
            boxShadow: "none",
          },
        },
        containedSecondary: {
          backgroundColor: "#F5F5F5",
          color: "#666666",
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
            backgroundColor: "#E2E2E2",
            boxShadow: "none",
          },
        },
      },
    },
  },
});

export default theme;

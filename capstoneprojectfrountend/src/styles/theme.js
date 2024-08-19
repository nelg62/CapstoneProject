"use client";
import { createTheme } from "@mui/material/styles";

// Define your theme colors and other options
const theme = createTheme({
  palette: {
    primary: {
      main: "#009688", // Accent color
    },
    secondary: {
      main: "#B0BEC5", // Secondary color
    },
    background: {
      default: "#FAFAFA", // Neutral background color
    },
    text: {
      primary: "#212121", // Primary text color
      secondary: "#757575", // Secondary text color
    },
  },
  typography: {
    h6: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 300,
    },
  },
  components: {
    // Add custom styles for MUI components if needed
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          padding: "0.5rem 1rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "1rem",
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          objectFit: "contain",
        },
      },
    },
  },
});

export default theme;

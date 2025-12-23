// src/theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },

  styles: {
    global: {
      "html, body": {
        bg: "gray.50",
        color: "gray.800",
        fontFamily: "Inter, sans-serif",
        lineHeight: "1.6",
      },

      "*:focus-visible": {
        outline: "3px solid #4C87FF",
        outlineOffset: "3px",
      },
    },
  },

  shadows: {
    soft: "0 4px 20px rgba(0,0,0,0.06)",
  },

  radii: {
    xl: "16px",
  },

  colors: {
    brand: {
      50: "#E8F0FF",
      100: "#C5D7FF",
      200: "#9FBAFF",
      300: "#7A9DFF",
      400: "#5E88FF",
      500: "#4C87FF", // Couleur principale Sleek Pro
      600: "#3C6BD6",
      700: "#2D50A6",
      800: "#1E3677",
      900: "#0F1C49",
    },
  },
});

export default theme;

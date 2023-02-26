import { createTheme } from "@mui/material";
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 769,
      lg: 992,
      xl: 1200,
    },
  },
});

export default theme;

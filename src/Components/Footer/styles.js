import theme from "../Drawer/theme";
const styles = {
  body: {
    bgcolor: "#b7dbe8",
    boxShadow: "none",
    borderRadius: 0,
    p: "1rem",
  },
  card: {
    p: "1rem",
    color: "#fafafa",
    bgcolor: "transparent",
    boxShadow: "none",
    [theme.breakpoints.down("lg")]: {
      display: "flex",
      flexDirection: "column-reverse",
    },
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
  },
  left: {
    color: "#fafafa",
    bgcolor: "transparent",
    boxShadow: "none",
    [theme.breakpoints.down("lg")]: {
      display: "flex",
      flexDirection: "column",
    },
    [theme.breakpoints.up("lg")]: {
      // width:"50%",
      display: "flex",
      // alignItems: "center",
      justifyContent: "space-between",
    },
  },
  bodyLeft: {
    display: "flex",
    flexDirection: "column",
    boxShadow: "none",
    bgcolor: "transparent",
    [theme.breakpoints.up("lg")]: {
      margin: "1rem 2rem",
    },
    [theme.breakpoints.down("lg")]: {
      display: "flex",
      alignItems: "center",
      margin: "1rem 0px",
    },
  },
  right: {
    color: "#fafafa",
    boxShadow: "none",
    bgcolor: "transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  bodyRight: {
    boxShadow: "none",
    bgcolor: "transparent",
    padding: 0,
    display: "flex",
  },
  link: {
    m: 0,
    p: 0,
    margin: "0.3rem 0px",
    fontSize: "1rem",
    fontFamily: "Open Sans, sans-serif",
    fontWeight: "500",
    color: "#102582",
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      color: "#0f31d1",
    },
  },
  medias: {
    color: "#102582",
    width: "2.5rem",
    height: "2.5rem",
    margin: "0.5rem",
    padding: "0.5rem",
    border: "1px solid #102582",
    "&:hover": {
      color: "#0f31d1",
      border: "1px solid #0f31d1",
      bgcolor: "transparent",
    },
  },
};
export default styles;

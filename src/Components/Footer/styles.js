import theme from "../Drawer/theme";
import colors from '../../colors'

const styles = {
  body: {
    width:'auto',
    bgcolor: colors.green[3],
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
  title:{
    color: colors.green[10],
    fontSize: "1.2em",
    fontWeight: "bold",
    margin: "0.6em 0px",
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
    color: colors.green[10],
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      color: colors.green[10],
    },
  },
  medias: {
    color: colors.green[10],
    width: "2.5rem",
    height: "2.5rem",
    margin: "0.5rem",
    padding: "0.5rem",
    border: `1px solid ${colors.green[10]}`,
    "&:hover": {
      color: colors.green[7],
      border: `1px solid ${colors.green[7]}`,
      bgcolor: "transparent",
    },
  },
};
export default styles;

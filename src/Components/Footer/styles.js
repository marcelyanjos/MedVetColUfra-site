import theme from "../Drawer/theme";
const styles = {
  body: {
    bgcolor: "#b7dbe8",
    boxShadow:'none',
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
  right: {
    color: "#fafafa",
    boxShadow: "none",
    bgcolor: "transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    '&:hover':{
      color:'#0f31d1'
    }
  },
  button: {
    fontFamily: "Open Sans",
    bgcolor: "#fafafa",
    width: "11rem",
    padding: "0.5rem",
    margin: "1rem",
    borderRadius: 50,
    color: "#1e192c",
    "&:hover": {
      bgcolor: "#fafafa",
      color: "#8647ad",
    },
  },
  buttonIcon: {
    margin: "0.5rem",
    width: "2rem",
    height: "2rem",
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
      bgcolor:'transparent'
    },
  },
};
export default styles;

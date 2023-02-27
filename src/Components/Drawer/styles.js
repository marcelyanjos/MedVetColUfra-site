const styles = {
  appbar: {
    boxShadow: "none",
    backgroundColor: "rgba(179, 232, 255, 0.6)",
    // height: "300px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
  },
  appbarLogo: {
    color: "#102582",
    fontSize: 35,
    fontFamily: "Public Sans",
    fontWeight: "bold",
  },
  toolbar: {
    padding: "0 12px 0 12px",
    display: "flex",
    justifyContent: "space-around",
  },
  drawerBody: {
    textAlign: "center",
    bgcolor: "rgba(179, 232, 255, 0.6)",
    height: "100%",
    color: "#fafafa",
    padding: 1,
  },
  close: {
    width: "100%",
    display: "flex",
    justifyContent: "end",
  },
  drawerLogo: {
    color: "#102582",
    fontSize: 35,
    fontFamily: "Public Sans",
    fontWeight: "bold",
    pb: 4,
  },
  button: {
    textAlign: "center",
    color: "#102582",
    textTransform: "none",
    fontSize: "1rem",
    fontFamily: "Open Sans, sans-serif",
    "&:hover": {
      backgroundColor: "transparent",
      fontWeight: "bold",
    },
  },
  medias: {
    color: "#102582",
    width: "3rem",
    height: "3rem",
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

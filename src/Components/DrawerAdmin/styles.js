import colors from "../../colors";

const drawerWidth = 320;

const styles = {
  appbar: {
    backgroundColor: 'rgba(181,228,198,0.6)',
    color:colors.green[10],
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
  },
  logoName: {
    color: "#212B36",
    fontSize: 35,
    fontFamily: "Public Sans",
    fontWeight: "500",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      // backgroundColor:"#cfeffd",
      boxSizing: "border-box",
    },
  },
  drawerLogoName: {
    color: "#74C1EB",
    fontSize: 30,
    fontFamily: "Public Sans",
    fontWeight: "500",
    width: "85%",
    // display:'flex',
    alignItems: "start",
  },
  menuDrawer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 8,
  },
};
export default styles;

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(({theme}) => ({
  root: {
    display: "flex",
    height: "94.1%",
    flexDirection: "row",
  },
  // appBar: {
  //   transition: theme.transitions.create(["margin", "width"], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  //   // backgroundColor:'#ffffd9'
  // },
  toolbar: {
    padding: "0",
    display: "flex",
    width: "auto",
    justifyContent: "center",
    position: "relative",
  },
  insidebar: {
    minWidth: "98%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
    paddingTop: 10,
    height: "97.75%",
    // backgroundColor:'pink'
  },
  image: {
    minWidth: "50px",
    maxHeight: "60px",
    minHeight: "20px",
  },
  submenu: {
    width: "auto",
    // marginRight: '1%',
    // backgroundColor:'green',
    position: "relative",
    // float: "right",
    justifyContent: "flex-end",
    display: "flex",
    flexDirection: "row",
  },
  // menuitens
  rootItem: {
    width: "45px",
    height: "45px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  links:{
    width:'100%',
    color:'black',
    textDecoration:'none',
  }
}));
export { useStyles };
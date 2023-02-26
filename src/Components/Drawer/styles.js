const styles = {
  logo: {
    width: 200,
    height: 143,
    margin: 0,
  },
  appbar: {
    boxShadow: "none",
    backgroundColor: "rgba(179, 232, 255, 0.6)",
    // height: "300px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
  },
  drawer: {
    textAlign: "center",
    bgcolor: "rgba(179, 232, 255, 0.6)",
    height: "100%",
    color: "#fafafa",
    padding:1
  },
  close: {
    width:'100%',
    display:'flex',
    justifyContent:'end',
  },
  button: {
    textAlign: "center",
    color: "#102582",
    textTransform: "none",
    fontSize: "1rem",
    fontFamily: "Open Sans, sans-serif",
    "&:hover": {
      backgroundColor: "transparent",
      fontWeight:'bold',
    },
  },
  sign: {
    backgroundColor: "#565656",
    color: "#fff",
    padding: "0.25rem 1.5rem",
    borderRadius: "2rem",
    margin: 1,
    marginTop: 1.5,
    height: "25px",
    "&:hover": {
      backgroundColor: "#e4105d",
    },
  },
  buttonSign:{
    margin:'1rem 1rem 1rem 0px',
    padding:'0.3rem 1.5rem',
    borderRadius:10,
    bgcolor:'#8647ad',
    color:'#fafafa',
    fontFamily: "Open Sans, sans-serif",
  },
  buttonSignOut:{
    padding:'0.3rem 1.5rem',
    margin:'1rem 1rem 1rem 0px',
    color:'#fafafa',
    borderRadius:10,
    border:'2px solid #8647ad',
    fontSize:'16px',
    fontFamily: "Open Sans, sans-serif",
  },
  avatar: {
    padding:0.5,
    filter: "grayscale(100%)",
    "&.Mui-checked": {
      filter: "grayscale(0)",
    },
    "&:hover": {
      filter: "grayscale(0)",
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
      bgcolor:'transparent'
    },
  },
};
export default styles;

import colors from "../../../colors"
import theme from "../../theme"

const styles = {
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        minWidth: '280px',
        [theme.breakpoints.down('md')]:{
            height: "100%",
        },
        [theme.breakpoints.up('md')]:{
            height: "100vh",
        },
        minHeight:'100vh',
        // flexDirection: "row",
        backgroundColor: colors.green[0],
    },
    paper: {
        borderRadius: '16px',
        boxShadow: "0px 2px 10px 4px rgba(0,0,0,0.1)",
        backgroundColor: "rgba(255,255,255,0.6)",
        width: "30%",
        // flex:0.5,
        minWidth: '280px',
        //commit
        // minHeight: "40vh",
        mb: 1,
        height: "auto",
        display: "flex",
        //   flexWrap:'wrap-reverse',
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        height: "100%",
        width: "100%",
        padding: '20px',
        display: "flex",
        flexDirection: "column",
    },
    flex2: {
        minWidth: '100px',
        minHeight: '20px',
        //   width: "45%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }
}
export default (styles)
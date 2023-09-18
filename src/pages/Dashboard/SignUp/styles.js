import colors from '../../../styles/colors'
import theme from '../../theme'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minWidth: 280,
    [theme.breakpoints.down('md')]: {
      height: '100%',
    },
    [theme.breakpoints.up('md')]: {
      height: '100vh',
    },
    minHeight: '100vh',
    // flexDirection: "row",
    backgroundColor: colors.green[0],
  },
  paper: {
    borderRadius: 16,
    boxShadow: '0px 2px 10px 4px rgba(0,0,0,0.1)',
    backgroundColor: 'rgba(255,255,255,0.6)',
    width: '30%',
    // flex:0.5,
    minWidth: 280,
    // commit
    // minHeight: "40vh",
    mb: 1,
    height: 'auto',
    display: 'flex',
    //   flexWrap:'wrap-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: '100%',
    width: '100%',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  flex2: {
    minWidth: 100,
    minHeight: 20,
    //   width: "45%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}
export default styles

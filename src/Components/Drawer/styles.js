import colors from '../../styles/colors'
import theme from '../theme'
const styles = {
  appbar: {
    boxShadow: 'none',
    p: 0,
    backgroundColor: colors.green[0],
    // height: "300px",
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
  },
  titleLogo: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    color: colors.green[10],
  },
  appbarLogo: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: { ml: '-4%' },
  },
  toolbar: {
    p: 0,
    display: 'flex',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('sd')]: {
      p: 3,
    },
  },
  menuIcon: {
    color: colors.green[10],
    bgcolor: 'transparent',
    // mr: { sm: "-5%" },
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  drawerBody: {
    textAlign: 'center',
    bgcolor: colors.green[0],
    height: '100%',
    color: '#fafafa',
    padding: 1,
  },
  close: {
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
  },
  drawerLogo: {
    textDecoration: 'none',
    color: colors.green[10],
    fontSize: 36,
    fontFamily: 'Public Sans',
    fontWeight: 'bold',
    pb: 4,
  },
  button: {
    textAlign: 'center',
    color: colors.green[10],
    textTransform: 'none',
    fontSize: '1rem',
    fontFamily: 'Open Sans, sans-serif',
    '&:hover': {
      backgroundColor: 'transparent',
      fontWeight: 'bold',
    },
  },
  medias: {
    color: colors.green[10],
    width: '3rem',
    height: '3rem',
    margin: '0.5rem',
    padding: '0.5rem',
    border: `1px solid ${colors.green[10]}`,
    '&:hover': {
      color: colors.green[7],
      border: `1px solid ${colors.green[7]}`,
      bgcolor: 'transparent',
    },
  },
}
export default styles

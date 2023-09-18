import colors from '../../../styles/colors'
import theme from '../../theme'

const styleAdd = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    pt: 3,
    pb: 3,
    pl: 5,
    pr: 5,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '40%',
    mr: 1,
  },
  calendar: {
    mt: 2,
    mb: 2,
    borderRadius: '10px',
    border: '1px solid #000',
  },
}

const styles = {
  index_box: {
    pb: 5,
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('lg')]: {
      pl: 2,
      pr: 2,
    },
    [theme.breakpoints.up('lg')]: {
      pl: 6,
      pr: 6,
    },
  },
  index_box2: {
    pb: 5,
    flexGrow: 1,
    // display: "flex",
    justifyContent: 'space-between',
    [theme.breakpoints.down('lg')]: {
      pl: 2,
      pr: 2,
    },
    [theme.breakpoints.up('lg')]: {
      pl: 6,
      pr: 6,
    },
  },
  table_box: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('lg')]: {
      // width:'100%',
      pl: 2,
      pr: 2,
    },
  },
  table_paper: {
    width: '100%',
    maxWidth: '88vw',
    mb: 2,
    borderRadius: 4,
    boxShadow: '0px 1px 3px 0px rgba(65,65, 65, 0.1)',
    padding: 1,
  },
  modal_paper: {
    width: '100%',
    maxWidth: '88vw',
    borderRadius: 4,
    boxShadow: '0px 1px 3px 0px rgba(65,65, 65, 0.1)',
    padding: 1,
    height: '100%',
  },
  table_dataGrid: {
    margin: 1,
    minHeight: '400px',
    border: 'none',
    '.MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold' },
  },
  modal_grid: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'auto',
    width: '85%',
    // minHeight: 600,
    height: '100%',
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 3,
    p: 3,
    '&::-webkit-scrollbar': {
      width: 10,
      border: '1px outset',
    },
    '&::-webkit-scrollbar-track': {
      // boxShadow: 'inset 0 0 5px grey',
      borderRadius: 10,
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(179, 232, 255, 0.5)',
      borderRadius: 10,
    },
  },
  modal_button: {
    color: colors.green[5],
    border: '1.5px solid',
    '&:hover': {
      color: colors.green[7],
      bgcolor: 'transparent',
      border: `1px solid ${colors.green[7]}`,
    },
  },
  modal_box: {
    mb: 0,
    // display: 'flex',
    // position: 'absolute',
    // alignItems: 'center',
    minHeight: '300px',
    height: '100%',
    justifyContent: 'space-between',
    //   border: '1px solid #CFD0D7',
    p: 1,
  },
}

export { styleAdd, styles }

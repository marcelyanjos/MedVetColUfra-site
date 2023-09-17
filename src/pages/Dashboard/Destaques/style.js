import colors from '../../../styles/colors'
import theme from '../../theme'

const stylesTable = {
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
  image: {
    borderRadius: '30px',
    objectFit: 'cover',
    width: '50px',
    height: '50px',
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
  table_dataGrid: {
    margin: 1,
    minHeight: '400px',
    border: 'none',
    '.MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold' },
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
}

const stylesEditor = {
  loading: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropzone: {
    border: '2px dashed #ccc',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
  },
  submit: {
    bgcolor: colors.green[4],
    mr: 1,
    color: '#ffffff',
  },
  link: {
    borderColor: colors.green[4],
    color: colors.green[4],
  },
}

export { stylesEditor, stylesTable }

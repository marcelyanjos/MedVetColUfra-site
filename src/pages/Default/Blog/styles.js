import theme from '../theme'

const styles = {
  body: {
    minHeight: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    mb: 3,
  },
  content: {
    width: { sm: '95%', xs: '92%' },
    mt: 4,
    height: '100%',
    mb: 5,
  },
  filters: {
    mb: 4,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    color: '#383838',
    fontSize: 32,
    fontWeight: 'bold',
  },
  searchBar: {
    border: '0.5px solid #b3b3b3',
    borderRadius: '10px',
    flex: 0.6,
    p: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    height: '40px',
  },
  iconFilter: {
    width: '45px',
    height: '45px',
    color: '#383838',
    ml: 1,
    '&:hover': { color: '#102582' },
  },
  cardsBody: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  card: {
    height: '400px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '205px',
      width: '100%',
    },
    [theme.breakpoints.down('sd')]: {
      minWidth: '205px',
      width: '100%',
    },
    [theme.breakpoints.up('sd')]: {
      minWidth: '205px',
      width: '48%',
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: '300px',
      width: '29%',
    },
    mb: 4,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
  },
}
export default styles

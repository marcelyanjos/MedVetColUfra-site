import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import ModalUser from '../sections/@dashboard/user/ModalUser';
//
import USERLIST from '../_mocks_/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'idPet', label: 'ID', alignRight: false },
  { id: 'nomePet', label: 'Nome', alignRight: false },
  { id: 'espcie', label: 'Especie', alignRight: false },
  { id: 'genero', label: 'Genero', alignRight: false },
  { id: 'idade', label: 'Idade', alignRight: false },
  { id: 'adotado', label: 'Adotado', alignRight: false },
  { id: 'especial', label: 'Especial', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.nomePet.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('nomePet');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [apiData, setApiData] = useState([]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = apiData.map((n) => n.nomePet);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, nomePet) => {
    const selectedIndex = selected.indexOf(nomePet);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, nomePet);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - apiData.length) : 0;

  const filteredUsers = applySortFilter(apiData, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;
  // Database
  useEffect(() => {
    getAPI();
  }, [setApiData]);
  const getAPI = () => {
    const API = 'http://localhost:3001/pets';
    fetch(API)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setApiData(data);
      });
  };
  console.log(apiData);

  // apiData.map((index) => {
  //   console.log(index.imgPet);
  //   return <Typography>{index.imgPet}</Typography>;
  // });
  return (
    <Page title="User | Minimal-UI">
      <Container maxWidth="x1">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Animais do Canil/Gatil
          </Typography>
          {/* <Button
            sx={{ color: '#62B6E4', border: '1.5px solid' }}
            variant="outlined"
            color="secondary"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New User
          </Button> */}
          <ModalUser />
        </Stack>
        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar sx={{ marginTop: -3 }}>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={apiData.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { idPet, nomePet, genero, especie, idade, adotado, especial } = row;
                      const isItemSelected = selected.indexOf(nomePet) !== -1;

                      return (
                        <TableRow
                          hover
                          key={idPet}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            {/* <Checkbox
                              color="secondary"
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            /> */}
                          </TableCell>
                          <TableCell align="left">{idPet}</TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              {/* <Avatar alt={nomePet} src={avatarUrl} /> */}
                              <Typography variant="subtitle2" noWrap>
                                {nomePet}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{especie}</TableCell>
                          <TableCell align="left">{genero}</TableCell>
                          <TableCell align="left">{idade}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(adotado === false && 'error') || 'success'}
                            >
                              {(adotado === false && 'Não') || 'Sim'}
                            </Label>
                          </TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(especial === false && 'error') || 'success'}
                            >
                              {(especial === false && 'Não') || 'Sim'}
                            </Label>
                          </TableCell>
                          <TableCell align="right">
                            <UserMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={apiData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

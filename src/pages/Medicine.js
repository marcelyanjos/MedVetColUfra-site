import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
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
import {
  MedicineListHead,
  MedicineListToolbar,
  MedicineMoreMenu
} from '../sections/@dashboard/medicine';
import ModalMedicine from '../sections/@dashboard/medicine/ModalMedicine';
//
import MEDICINELIST from '../_mocks_/medicine';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'drugName', label: 'Drug Name', alignRight: false },
  { id: 'type', label: 'Type', alignRight: false },
  { id: 'prize', label: 'Prize', alignRight: false },
  { id: 'qtdStorage', label: 'Storage Amount', alignRight: false },
  { id: 'qtdEssencial', label: 'Essencial Amount', alignRight: false }
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
      (_medicine) => _medicine.drugName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Medicine() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = MEDICINELIST.map((n) => n.drugName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - MEDICINELIST.length) : 0;

  const filteredMedicines = applySortFilter(
    MEDICINELIST,
    getComparator(order, orderBy),
    filterName
  );

  const isMedicineNotFound = filteredMedicines.length === 0;

  return (
    <Page title="Medicine | Minimal-UI">
      <Container maxWidth="x1">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Estoque de Medicamentos
          </Typography>
          {/* <Button
            sx={{ color: '#62B6E4', border: '1.5px solid' }}
            variant="outlined"
            color="secondary"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Medicine
          </Button> */}
          <ModalMedicine />
        </Stack>

        <Card>
          <MedicineListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar sx={{ marginTop: -3 }}>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <MedicineListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={MEDICINELIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredMedicines
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, drugName, type, minPrize, maxPrize, qtdStorage, qtdEssencial } =
                        row;
                      const isItemSelected = selected.indexOf(drugName) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
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
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{drugName}</TableCell>
                          <TableCell align="left">{type}</TableCell>
                          <TableCell align="left">
                            {' '}
                            R${minPrize} ~ R${maxPrize}
                          </TableCell>
                          <TableCell align="left">{qtdStorage}</TableCell>
                          <TableCell align="left">{qtdEssencial}</TableCell>
                          <TableCell align="right">
                            <MedicineMoreMenu />
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
                {isMedicineNotFound && (
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
            count={MEDICINELIST.length}
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

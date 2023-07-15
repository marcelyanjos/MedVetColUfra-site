import * as React from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Toolbar, Paper, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import {
  randomCreatedDate,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";
import styles from './style';
import medicine from "../../../mockup/medicine";

export default function ColumnTypesGrid() {
  const [pageSize, setPageSize] = React.useState(5);
  const [rows, setRows] = React.useState(medicine);

  const deleteUser = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    []
  );

  const details = React.useCallback(
    (id) => () => {
      // setRows((prevRows) =>
      //   prevRows.map((row) =>
      //     row.id === id ? { ...row, isAdmin: !row.isAdmin } : row,
      //   ),
      // );
      console.log("details: ", medicine[id - 1]);
    },
    []
  );

  const edit = React.useCallback(
    (id) => () => {
      // setRows((prevRows) => {
      //   const rowToDuplicate = prevRows.find((row) => row.id === id);
      //   return [...prevRows, { ...rowToDuplicate, id: Date.now() }];

      // });
      console.log("edit: ", id);
    },
    []
  );

  const columns = React.useMemo(
    () => [
      { field: "id", type: "number", minWidth: 100, flex: 0.3 },
      { field: "nome", type: "string", minWidth: 180, flex: 1 },
      { field: "tipo", type: "string", minWidth: 120, flex: 0.6 },
      { field: "max_preco", type: "string", minWidth: 120, flex: 0.4 },
      { field: "min_preco", type: "string", minWidth: 120, flex: 0.4 },
      { field: "qtd_estoque", type: "number", minWidth: 120, flex: 0.4 },
      { field: "qtd_essencial", type: "number", minWidth: 120, flex: 0.4 },
      // {
      //   field: 'discount',
      //   type: 'singleSelect',
      //   width: 120,
      //   editable: true,
      //   valueOptions: ({ row }) => {
      //     if (row === undefined) {
      //       return ['EU-resident', 'junior'];
      //     }
      //     const options = [];
      //     if (!['United Kingdom', 'Brazil'].includes(row.country)) {
      //       options.push('EU-resident');
      //     }
      //     if (row.idade < 27) {
      //       options.push('junior');
      //     }
      //     return options;
      //   },
      // },
      {
        field: "actions",
        type: "actions",
        width: 90,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<InfoIcon />}
            label="Details"
            onClick={details(params.id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={edit(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [details, deleteUser, edit]
  );

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Paper
        sx={styles.paper}
      >
        <DataGrid
          columns={columns}
          rows={rows}
          sx={{
            margin: 1,
            border: "none",
            ".MuiDataGrid-columnHeaderTitle": { fontWeight: "bold" },
          }}
          autoHeight
          disableColumnSelector
          disableDensitySelector
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 15]}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </Paper>
    </Box>
  );
}

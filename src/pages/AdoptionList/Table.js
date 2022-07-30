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

const initialRows = [
  {
    id: 1,
    nome: "Damien",
    image:
      "https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg",
    idade: 1.6,
    especie: "gato",
    sexo: "macho",
    especial: false,
    adotado: false,
  },
  {
    id: 2,
    nome: "Clara",
    image:
      "https://static.poder360.com.br/2020/04/GATO-CORONAVIRUS-768x737.jpg",
    idade: 2.6,
    especie: "gato",
    sexo: "femea",
    especial: true,
    adotado: false,
  },
  {
    id: 3,
    nome: "Mel",
    image:
      "https://conteudo.imguol.com.br/c/entretenimento/eb/2022/03/23/cachorro-da-raca-lulu-da-pomeramia-1648065976007_v2_900x506.jpg.webp",
    idade: 1.9,
    especie: "cachorro",
    sexo: "femea",
    especial: false,
    adotado: true,
  },
  {
    id: 4,
    nome: "Luna",
    image:
      "https://www.istoedinheiro.com.br/wp-content/uploads/sites/17/2020/08/cachorro.jpg",
    idade: 0.6,
    especie: "cachorro",
    sexo: "femea",
    especial: true,
    adotado: false,
  },
  {
    id: 5,
    nome: "Zacarias",
    image:
      "https://www.significadodossonhosonline.com/wp-content/uploads/2019/07/sonhar-matando-gato.jpg",
    idade: 2.3,
    especie: "gato",
    sexo: "macho",
    especial: false,
    adotado: false,
  },
  {
    id: 6,
    nome: "Branca",
    image:
      "https://s2.glbimg.com/iSHDkXpLfK9AeHTGD8op1em2pYI=/e.glbimg.com/og/ed/f/original/2022/02/14/vidadebicho-gato-sol-pexels-photo-1469228.jpeg",
    idade: 2.2,
    especie: "gato",
    sexo: "femea",
    especial: false,
    adotado: true,
  },
  {
    id: 7,
    nome: "Leonidas",
    image:
      "https://vetex.vet.br/blog/wp-content/uploads/2021/10/cachorro-gosta-de-carinho.png",
    idade: 1.3,
    especie: "cachorro",
    sexo: "macho",
    especial: true,
    adotado: false,
  },
];

export default function ColumnTypesGrid() {
  const [pageSize, setPageSize] = React.useState(5);
  const [rows, setRows] = React.useState(initialRows);

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
      console.log("details: ", initialRows[id - 1]);
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
      { field: "id", type: "number", minWidth: 100, flex: 0.6 },
      { field: "nome", type: "string", minWidth: 120, flex: 1 },
      { field: "especie", type: "string", minWidth: 120, flex: 1 },
      { field: "sexo", type: "string", minWidth: 120, flex: 1 },
      { field: "idade", type: "number", minWidth: 70, flex: 0.6 },
      { field: "especial", type: "boolean", minWidth: 80, flex: 0.6 },
      { field: "adotado", type: "boolean", minWidth: 80, flex: 0.6 },
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
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<InfoIcon />}
            label="Details"
            onClick={details(params.id)}
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
    [deleteUser, details, edit]
  );

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          borderRadius: 4,
          boxShadow: "0px 1px 3px 0px rgba(65,65, 65, 0.1)",
          padding: 1,
        }}
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

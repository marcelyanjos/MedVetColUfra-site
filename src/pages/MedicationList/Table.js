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

const initialRows = [
  {
    id: 1,
    nome: "NexGard para cães de 4,1 a 10Kg caixa Com 3 Unidades",
    img: "https://www.petlove.com.br/images/products/227466/product/Antipulgas_e_Carrapatos_NexGard_28_3_mg_para_C%C3%A3es_de_4_1_a_10_Kg_3105746-1_3tablete.jpg?1627727353",
    descricao:
      "NexGard é um antipulgas e anticarrapatos oferecido por via oral (apresentado em comprimido com sabor atrativo) que protege seu cachorro a partir de seis horas após a administração. Ele pode ser dado para cães adultos e filhotes acima de oito semanas de idade (dois meses).",
    tipo: "antipulgas",
    min_preco: "R$64.26",
    max_preco: "R$99.99",
    qtd_estoque: 54,
    qtd_essencial: 79,
  },
  {
    id: 2,
    nome: "Simparic para Cães de 20,1 a 40 Kg (80 mg) - Antipulgas",
    img: "https://www.petlove.com.br/images/products/191346/product/3110176.jpg?1627616214",
    tipo: "antipulgas",
    descricao:
      "O Antipulgas Zoetis Simparic 80 mg para Cães 20,1 a 40 kg utilizado para o tratamento das infestações por pulgas e sarna sarcótica. Após a administração do Simparic, a sua atividade contra pulgas dura, pelo menos, 5 semanas. O medicamento também pode ser utilizado como parte de uma estratégia de tratamento para o controle da dermatite alérgica por picada de pulga (uma reação alérgica às picadas de pulga). Contém a substância ativa sarolaner.",
    min_preco: "R$64.37",
    max_preco: "R$200",
    qtd_estoque: 86,
    qtd_essencial: 112,
  },
  {
    id: 3,
    nome: "Itl 50 Itraconazol 50Mg 10 Cápsulas Cepav",
    img: "https://www.petlove.com.br/images/products/235171/product/ITL_25_1.jpg?1627754430",
    tipo: "antifungos",
    descricao:
      "O Antifúngico ITL Itraconazol apresenta um largo espectro de ação antimicótica, sendo ativo em infecções causadas por fungos e leveduras tais como: Microsporum spp., Trichophyton spp., Malassezia pachydermatis, Candida spp., Aspergilus spp., Cryptococcus spp., Blastomyces spp., Histoplasma spp., Coccidioides inmitis, Acremonium spp.",
    min_preco: "R$84.9",
    max_preco: "R$97.3",
    qtd_estoque: 9,
    qtd_essencial: 64,
  },
  {
    id: 4,
    nome: "Cal-D-Mix c/30 Comprimidos Vetnil",
    img: "https://royalpets.vteximg.com.br/arquivos/ids/234130-510-640/-c-a-cal-d-mix-30-compr.jpg?v=637686958743830000",
    tipo: "vitamina",
    descricao:
      "CAL-D-MIX é um produto rico em cálcio, contendo os principais elementos para o crescimento ideal dos animais.\nSua formulação contém Cálcio, Fósforo, Zinco, Selênio, Vitamina E, Vitamina A, Vitamina B12 e Vitamina D3, balanceados de forma a atender às necessidades nutricionais dos animais.",
    min_preco: "R$35.9",
    max_preco: "R$69.9",
    qtd_estoque: 54,
    qtd_essencial: 79,
  },
  {
    id: 5,
    nome: "Furolisin",
    img: "https://a-static.mlcdn.com.br/618x463/furolisin-10mg-10-comprimidos-vetnil/planetaanimal/aba1e7b08ed611eabb434201ac18501e/bea756a9c0549587da27bcaaa856bfe9.jpg",
    tipo: "Anti-inflamatório",
    descricao:
      "Furolisin® é um diurético a base de furosemida indicado para cães e gatos. Sua principal ação é no segmento ascendente da alça de Henle. A furosemida inibe a reabsorção de sódio, potássio e cloreto na porção espessa da alça de Henle, levando a diurese.",
    min_preco: "R$10.89",
    max_preco: "R$16.99",
    qtd_estoque: 54,
    qtd_essencial: 79,
  },
  {
    id: 6,
    nome: "Furanil Spray Vetnil 60ml",
    img: "https://static.petz.com.br/fotos/10007230000232-1.jpg",
    tipo: "Antiséptico",
    descricao:
      "- Indicado para cães e gatos;\n- Eficaz no tratamento de infecções bacterianas e fúngicas;\n- Pode ser usado para a limpeza de feridas, cortes, escoriações e úlceras;\n- Seguro para ser usado nas mucosas e órgãos genitais,\n- Disponível em frasco spray de 60 ml.",
    min_preco: "R$32.62",
    max_preco: "R$47.90",
    qtd_estoque: 54,
    qtd_essencial: 79,
  },
  {
    id: 7,
    nome: "Vermífugo Drontal Puppy",
    img: "https://www.petlove.com.br/images/products/220882/product/Verm%C3%ADfugo_Drontal_Puppy_2108011.jpg?1627706913",
    tipo: "Antiséptico",
    descricao:
      "O Vermífugo Drontal Puppy é indicado para o tratamento e controle das verminoses intestinais e de giardíase em cães filhotes e adultos de raças miniatura, apresentando excelentes resultando contra parasitas cestoides (vermes chatos), nematódeos (vermes redondos) e protozoários.",
    min_preco: "R$49.90",
    max_preco: "R$54.50",
    qtd_estoque: 54,
    qtd_essencial: 79,
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

import React, {useState, useEffect} from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Toolbar, Typography, Paper, Link,  Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import {useNavigate } from "react-router-dom";
import { decode } from "base-64";
import styles from "./style";
import axios from "axios";
import api from "../../../api";
import { getToken } from "../../../CMS/Helpers";
import { API, Host } from "../../../CMS/constant";

export default function ColumnTypesGrid() {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [articles, setArticles] = useState([]);
  const isAuthenticated = !!getToken();

  // console.log(isAuthenticated)

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        `${API}/sections-hovet?populate=icon&publicationState=preview`
      );
      const artigos = response.data.data;
      const updatedFormularios = artigos.map((artigo) => (
        // console.log('artigo', artigo.attributes.ilustracao.data.attributes.url),
        {
        id: artigo.id,
        titulo: artigo.attributes.titulo,
        "data criação": artigo.attributes.createdAt,
        publicado: artigo.attributes.publishedAt === null ? false : true,
        icon: artigo.attributes.icon?.data?.attributes?.url
        ? `${Host}${artigo.attributes.icon.data.attributes.url}`
        : null,
      }));

      setRows(updatedFormularios);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const details = React.useCallback(
    (id) => () => {
      // console.log("details: ", rows.find((row) => row.id === id));
      console.log("id", id)
    },
    []
  );

  const edit = React.useCallback(
    (id) => () => {
      console.log("id", id)
      navigate(`/admin/dashboard/hovetInfo/new/${id}`);
    },
    [navigate]
  );

  const columns = React.useMemo(
    () => [
      { field: "id", type: "number", flex: 0.6 },
      {
        field: "icon",
        headerName: "Icone",
        renderCell: (params) => (
          <img
            src={params.row.icon}
            alt="Icon"
            style={{
              borderRadius: "30px",
              objectFit: "cover",
              width: "50px",
              height: "50px",
            }}
          />
        ),
      },
      { field: "titulo", type: "string", flex: 1},
      { field: "data criação", type: "Date", flex: 0.6 },
      { field: "publicado", type: "boolean", flex: 0.6 },
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
            icon={<EditIcon />}
            label="Edit"
            onClick={edit(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [details, edit]
  );

  function CustomToolbar() {
    return (
        <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
            {/* <GridToolbarFilterButton /> */}
            < GridToolbarExport printOptions={{
                hideFooter: true,
                hideToolbar: true,
                fileName: 'customerDataBase',
                pageStyle: '.MuiDataGrid-root .MuiDataGrid-main {flex: 1}',
            }
            } />
            < GridToolbarQuickFilter />
        </GridToolbarContainer >
    );
}
  return (
    <div>
      <Box sx={styles.index_box}>
          <Typography
            fontFamily={"Public Sans"}
            fontWeight={700}
            color="#212B36"
            variant="h5"
          >
          Informações HOVET
        </Typography>
        <Link
          style={styles.modal_button}
          // variant="outlined"
          // color="primary"
          // startIcon={<AddIcon />}
          href="/admin/dashboard/hovetInfo/new"
        >
          New Article
        </Link>
      </Box>
      <Box sx={styles.table_box}>
        <Paper sx={styles.table_paper}>
          <DataGrid
            columns={columns}
            rows={rows}
            sx={styles.table_dataGrid}
            // autoHeight
            disableColumnSelector
            disableDensitySelector
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 15]}
            slots={{
              toolbar: CustomToolbar,
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: false,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </Paper>
      </Box>
    </div>
  );
}

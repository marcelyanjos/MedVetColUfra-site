import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import {
  Toolbar,
  Paper,
  Box,
  Container,
  Button,
  Typography,
  Link,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { format } from "date-fns";
import styles from "./style";
import api from "../../../api";
import { useNavigate } from "react-router-dom";

export default function Servicos() {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicosResponse, profissionaisResponse] = await Promise.all([
          api.get("/api/servicos"),
          api.get("/api/profissionais"),
        ]);

        const servicos = servicosResponse.data;
        const profissionais = profissionaisResponse.data;

        // Function to calculate the count of professionals for each service
        const getCountOfProfessionais = (id_servicos) => {
          return profissionais.filter((profissional) => profissional.id_servicos === id_servicos).length;
        };

        const updatedFormularios = servicos.map((servico) => {
          const { id_servicos } = servico;
          return {
            id: id_servicos,
            "serviço": servico.tipo_servico,
            "quantidade de profissionais": getCountOfProfessionais(id_servicos),
          };
        });

        setRows(updatedFormularios);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  const details = React.useCallback(
    (id) => () => {
      console.log(
        "details: ",
        rows.find((row) => row.id === id)
      );
    },
    []
  );

  const edit = React.useCallback(
    (id) => () => {
      console.log("edit: ", id);
      navigate(`/admin/dashboard/animais/new/${id}`);
    },
    [navigate]
  );

  const columns = React.useMemo(
    () => [
      { field: "id", type: "number", flex: 0.6 },
      { field: "serviço", type: "string", flex: 1 },
      { field: "quantidade de profissionais", type: "number", flex: 0.6 },
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
      <GridToolbarContainer sx={{ justifyContent: "space-between" }}>
        {/* <GridToolbarFilterButton /> */}
        <GridToolbarExport
          printOptions={{
            hideFooter: true,
            hideToolbar: true,
            fileName: "customerDataBase",
            pageStyle: ".MuiDataGrid-root .MuiDataGrid-main {flex: 1}",
          }}
        />
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    );
  }

  return (
    <Box>
      <Box sx={styles.index_box}>
        <Typography
          fontFamily={"Public Sans"}
          fontWeight={700}
          color="#212B36"
          variant="h5"
        >
          Serviços
        </Typography>
        <Box sx={{display:"flex"}}>
          <Button
            sx={styles.modal_button}
            variant="outlined"
            color="primary"
            component={Link}
            href={`/admin/dashboard/animais/new`}
            startIcon={<AddIcon />}
          >
            Adicionar novo serviço
          </Button>
        </Box>
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
    </Box>
  );
}

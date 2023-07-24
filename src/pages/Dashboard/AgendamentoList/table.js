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
  Link
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { format } from "date-fns";
import styles from "./style";
import api from "../../../api";

export default function ColumnTypesGrid() {
  const [pageSize, setPageSize] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/agendamentos");
        const agendamentos = response.data;

        const updatedAgendamentos = await Promise.all(
          agendamentos.map(async (agendamento) => {
            const { id_agendamento, id_cliente, id_pet, id_servicos } =
              agendamento;
            const dia = format(new Date(agendamento.dia), "dd/MM/yyyy");

            const clientResponse = await api.get(`/api/clientes/${id_cliente}`);
            const client = clientResponse.data;
            const dt_nasc = format(new Date(client.data_nasc), "dd/MM/yyyy");

            const petResponse = await api.get(`/api/petCliente/${id_pet}`);
            const pet = petResponse.data[0];

            const serviceResponse = await api.get(
              `/api/servicos/${id_servicos}`
            );
            const service = serviceResponse.data[0];

            return {
              id: id_agendamento,
              cliente: client.nome,
              "data de nascimento": dt_nasc,
              "nome do animal": pet.nome,
              "data da consulta": dia,
              horario: agendamento.hora,
              "tipo da consulta": service.tipo_servico,
            };
          })
        );

        setRows(updatedAgendamentos);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Detalhes ainda em console
  const details = React.useCallback(
    (id) => () => {
      console.log("details: ", rows[id - 1]);
    },
    []
  );

  const edit = React.useCallback(
    (id) => () => {
      console.log("edit: ", id);
    },
    []
  );

  const columns = React.useMemo(
    () => [
      { field: "id", type: "number", flex: 0.4 },
      { field: "cliente", type: "string", flex: 0.8 },
      { field: "data de nascimento", type: "Date", flex: 0.8 },
      { field: "nome do animal", type: "string", flex: 0.8 },
      { field: "data da consulta", type: "Date", flex: 0.8 },
      { field: "horario", type: "time", flex: 0.4 },
      { field: "tipo da consulta", type: "string", flex: 0.8 },
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
          Agendamentos
        </Typography>
        <Button
          sx={styles.modal_button}
          variant="outlined"
          color="primary"
          component={Link}
          href={`/admin/dashboard/animais/new`}
          startIcon={<AddIcon />}
        >
          Adicionar novo animal
        </Button>
      </Box>

      <Box sx={styles.table_box}>
        <Paper sx={styles.table_paper}>
          <DataGrid
            columns={columns}
            rows={rows}
            sx={styles.table_dataGrid}
            autoHeight
            autoWidth
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

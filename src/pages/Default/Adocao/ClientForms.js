import { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Button,
  TextField,
  Container,
  Card,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Toolbar, Paper, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { format, parseISO } from "date-fns";
import api from "../../../api";

function ClientForms(props) {
  const navigate = useNavigate();
  const [clientInfo, setClientInfo] = useState({
    nome: "",
    data_nasc: "",
    email: "",
  });

  const [showTable, setShowTable] = useState(false);
  const [agendamentos, setAgendamentos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClientInfoChange = (event) => {
    setClientInfo({
      ...clientInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSearchClient = (event) => {
    event.preventDefault();
    const dateOfBirth = new Date(clientInfo.data_nasc);
    api
      .get(
        `/api/clientes?nome=${clientInfo.nome.toUpperCase()}&data_nasc=${dateOfBirth.toISOString()}&email=${
          clientInfo.email
        }`
      )
      .then((clientResponse) => {
        const clients = clientResponse.data;

        if (clients.length === 1) {
          const id_cliente = clients[0].id_cliente; // Obtém o id do cliente
          loadAgendamentos(id_cliente);
          setShowTable(true);
        } else if (clients.length === 0) {
          alert("Cliente não encontrado");
          setAgendamentos([]);
          setShowTable(false);
        } else {
          alert(
            "Mais de um cliente encontrado com os mesmos dados. Verifique a base de dados."
          );
          setAgendamentos([]);
          setShowTable(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleClearSearch = () => {
    setClientInfo({
      nome: "",
      data_nasc: "",
      email: "",
    });
    setShowTable(false);
    setAgendamentos([]);
  };

  const loadAgendamentos = (id_cliente) => {
    setIsLoading(true);
    api
      .get(`/api/adoption-forms/${id_cliente}`)
      .then(async (response) => {
        const adocoes = await Promise.all(
          response.data.map(async (adocao) => {
            const { id_formulario, id_animal } = adocao;
            console.log("ids:", id_formulario, id_animal);
            const dia = format(new Date(adocao.data_envio), "dd/MM/yyyy");
            const petResponse = await api.get(`/api/animals/${id_animal}`);
            const pet = petResponse.data;

            return {
              id: id_formulario,
              cliente: clientInfo.nome,
              email: clientInfo.email,
              "data de nascimento": format(
                parseISO(clientInfo.data_nasc),
                "dd/MM/yyyy"
              ),
              "nome do animal": pet.nome,
              "data de envio": dia,
              moradia: adocao.tipo_moradia,
              ocupacao: adocao.ocupacao,
            };
          })
        );

        setAgendamentos(adocoes);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const columns = [
    { field: "id", type: "number", flex: 0.4 },
    { field: "cliente", type: "string", flex: 0.8 },
    { field: "data de nascimento", type: "Date", flex: 0.8 },
    { field: "nome do animal", type: "string", flex: 0.8 },
    { field: "data de envio", type: "Date", flex: 0.8 },
    { field: "ocupacao", type: "string", flex: 0.6 },
    { field: "moradia", type: "string", flex: 0.6 },
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
  ];

  const details = (id) => () => {
    console.log("details: ", agendamentos[id - 1]);
  };

  const edit = (id) => () => {
    console.log("edit: ", id);
  };

  return (
    <Container
      minHeight={"100%"}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Grid item>
          <Typography variant="h5" align="center">
            Consultar meus formularios de adoção
          </Typography>
          {!showTable && (
            <form onSubmit={handleSearchClient}>
              <Grid container spacing={2} p={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Nome"
                    name="nome"
                    placeholder="Nome Completo"
                    value={clientInfo.nome}
                    onChange={handleClientInfoChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    type="date"
                    label="Data de Nascimento"
                    name="data_nasc"
                    value={clientInfo.data_nasc}
                    onChange={handleClientInfoChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={clientInfo.email}
                    onChange={handleClientInfoChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button href="/adocao">Voltar</Button>
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained">
                    Buscar Cliente
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Grid>
        <Grid item sx={{ mt: 2 }}>
          {isLoading ? (
            <Typography variant="body1" align="center">
              Carregando agendamentos...
            </Typography>
          ) : (
            showTable && (
              <>
                <Paper>
                  <DataGrid
                    columns={columns}
                    rows={agendamentos}
                    autoHeight
                    pageSize={5}
                  />
                </Paper>
                <Button
                  variant="contained"
                  onClick={handleClearSearch}
                  sx={{ mt: 2 }}
                >
                  Voltar
                </Button>
              </>
            )
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default ClientForms;

import React, { useState, useEffect } from "react";
import {
  Alert,
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Snackbar,
} from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import api from "../../../api";
import { format } from "date-fns";
import dayjs from 'dayjs';
import "dayjs/locale/pt-br";

const AgendamentoConsulta = () => {
  const [servico, setServico] = useState("");
  const [dia, setDia] = useState(null);
  const [hora, setHora] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [nomeAnimal, setNomeAnimal] = useState("");
  const [idade, setIdade] = useState("");
  const [especie, setEspecie] = useState("");
  const [peso, setPeso] = useState("");
  const [sexo, setSexo] = useState("");
  const [motivoConsulta, setMotivoConsulta] = useState("");
  const [listaServicos, setListaServicos] = useState([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState(false);
  let id_cliente = "";

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    async function fetchServicos() {
      try {
        const response = await api.get("/api/servicos");
        setListaServicos(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchServicos();
  }, []);

  useEffect(() => {
    const horarios = [];
    for (let hour = 8; hour <= 16; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (
          !(hour === 11 && minute === 30) &&
          !(hour === 13 && minute === 30)
        ) {
          const time = `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`;
          horarios.push(time);
        }
      }
    }
    setHorariosDisponiveis(horarios);
  }, []);

  const handleServicoChange = (event) => {
    setServico(event.target.value);
    setDia(null);
    setHora("");
  };

  const handleDateChange = (date) => {
    setDia(date);
    setHora("");
  };

  console.log('dia',dayjs(dia).format("DD-MM-YYYY"))

  const handleHoraChange = (event) => {
    setHora(event.target.value);
  };

  const handleAgendarClick = async () => {
    if (!dia) {
      setOpenSnackbar(true);
      setSnackbarMessage("Por favor, escolha uma data.");
      setSnackbarSeverity("warning");
      return;
    }

    const dataObj = new Date(dia); // Converter a string de data em um objeto Date
    const formattedDia = dayjs(dia).format("MM-dd-YYYY");
    if (dataObj.getDay() === 0 || dataObj.getDay() === 6) {
      setOpenSnackbar(true);
      setSnackbarMessage("Por favor, escolha uma data durante a semana.");
      setSnackbarSeverity("warning");
      return;
    }

    if (dataObj < new Date()) {
      setOpenSnackbar(true);
      setSnackbarMessage("Por favor escolher uma data futura");
      setSnackbarSeverity("warning");
      return;
    }

    const agendamentoExistente = await verificarAgendamentoExistente(
      servico,
      formattedDia,
      hora
    );
    if (agendamentoExistente) {
      setOpenSnackbar(true);
      setSnackbarMessage(
        "Agendamento indisponivel para o horario. Selecione outra data ou um novo horario"
      );
      setSnackbarSeverity("warning");
      return;
    }

    const clienteExistente = await verificarClienteExistente(
      nomeCliente,
      dataNascimento,
      email
    );
    if (clienteExistente) {
      id_cliente = clienteExistente.id_cliente;
      const petExistente = await verificarPetExistente(
        id_cliente,
        nomeAnimal,
        especie,
        sexo
      );
      if (petExistente) {
        const id_pet = petExistente.id_pet;
        salvarAgendamento(servico, formattedDia, hora, id_cliente, id_pet);
      } else {
        const id_pet = await cadastrarPetCliente(id_cliente);
        if (!id_pet) {
          setOpenSnackbar(true);
          setSnackbarMessage(
            "Erro ao salvar dados do animal. Tente novamente."
          );
          setSnackbarSeverity("error");
          return;
        }
      }
    } else {
      id_cliente = await cadastrarCliente();
      if (id_cliente) {
        const id_pet = await cadastrarPetCliente(id_cliente);
        if (id_pet) {
          salvarAgendamento(servico, formattedDia, hora, id_cliente, id_pet);
        } else {
          setOpenSnackbar(true);
          setSnackbarMessage(
            "Erro ao salvar dados do animal. Tente novamente."
          );
          setSnackbarSeverity("error");
        }
      } else {
        setOpenSnackbar(true);
        setSnackbarMessage("Erro ao salvar dados do cliente. Tente novamente.");
        setSnackbarSeverity("error");
      }
    }
  };

  useEffect(() => {
    if (!hora) {
      setHorarioSelecionado(false);
    } else {
      setHorarioSelecionado(true);
    }
  }, [hora]);

  const verificarAgendamentoExistente = async (servico, data, horario) => {
    try {
      const response = await api.get("/api/disponibilidade", {
        params: {
          id_servicos: servico,
          dia: dayjs(dia).format("DD-MM-YYYY"),
          hora: horario,
        },
      });
      const { disponibilidade } = response.data;
      return disponibilidade !== "disponivel";
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const verificarClienteExistente = async () => {
    try {
      const response = await api.get("/api/clientes", {
        params: {
          nome: nomeCliente,
          data_nasc: dataNascimento,
          email: email,
        },
      });

      const clientes = response.data;
      return clientes.length > 0 ? clientes[0] : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const verificarPetExistente = async () => {
    try {
      const response = await api.get("/api/petCliente", {
        params: {
          id_cliente: id_cliente,
          nome: nomeAnimal,
          especie: especie,
          sexo: sexo,
        },
      });

      const pets = response.data;
      console.log("pet", response.data);
      return pets.length > 0 ? pets[0] : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const cadastrarCliente = async () => {
    try {
      const response = await api.post("/api/clientes", {
        nome: nomeCliente,
        data_nasc: dataNascimento,
        email: email,
      });
      setOpenSnackbar(true);
      setSnackbarMessage("Dados cliente adicionados com sucesso!");
      setSnackbarSeverity("success");
      return response.data.id_cliente;
    } catch (error) {
      setOpenSnackbar(true);
      setSnackbarMessage("Erro ao salvar dados do cliente. Tente novamente.");
      setSnackbarSeverity("error");
      return null;
    }
  };

  const cadastrarPetCliente = async (id_cliente) => {
    try {
      console.log("ID do cliente:", id_cliente); // Verifica se o ID do cliente está correto
      console.log("Dados do pet:", {
        id_cliente: id_cliente,
        nome: nomeAnimal,
        idade,
        especie,
        peso,
        sexo,
      }); // Verifica se os dados do pet estão corretos

      const response = await api.post("/api/petCliente", {
        id_cliente: id_cliente,
        nome: nomeAnimal,
        idade: idade.replace(/\D/g, ""),
        especie,
        peso: peso.replace(/\D/g, ""),
        sexo,
      });

      setOpenSnackbar(true);
      setSnackbarMessage("Dados do animal salvo com sucesso!");
      setSnackbarSeverity("success");
      return response.data.id_pet;
    } catch (error) {
      setOpenSnackbar(true);
      setSnackbarMessage("Erro ao salvar dados do animal. Tente novamente.");
      setSnackbarSeverity("error");
      return null;
    }
  };

  const salvarAgendamento = async (
    servico,
    data,
    horario,
    id_cliente,
    id_pet
  ) => {
    try {
      await api.post("/api/agendamentos", {
        id_servicos: servico,
        id_cliente: id_cliente,
        id_pet: id_pet,
        dia: dayjs(dia).format("DD-MM-YYYY"),
        hora: horario,
        motivo: motivoConsulta,
        situacao: "Agendado",
      });
      setOpenSnackbar(true);
      setSnackbarMessage("Agendamento salvo com sucesso!");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error(error);
      setOpenSnackbar(true);
      setSnackbarMessage("Erro ao agendar consulta. Tente novamente.");
      setSnackbarSeverity("error");
    }
  };

  const isFormComplete = () => {
    return (
      nomeCliente &&
      dataNascimento &&
      email &&
      nomeAnimal &&
      idade &&
      especie &&
      peso &&
      sexo &&
      motivoConsulta &&
      servico &&
      dia &&
      hora
    );
  };

  const isHorarioSelecionado = (horario) => {
    return hora === horario && horarioSelecionado;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        pt: 3,
        pb: 3,
        pl: 5,
        pr: 5,
      }}
    >
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Typography variant="h6">Agendamento de Consulta</Typography>
      <Box sx={{ display: "flex", mt: 2 }}>
        <Box
          sx={{ display: "flex", flexDirection: "column", width: "40%", mr: 1 }}
        >
          <TextField
            select
            required
            size="small"
            label="Serviço"
            name="serviço"
            value={servico}
            onChange={handleServicoChange}
          >
            {listaServicos.map((servico) => (
              <MenuItem key={servico.id_servicos} value={servico.id_servicos}>
                {servico.tipo_servico}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            label="Nome completo"
            name="Nome completo"
            size="small"
            value={nomeCliente}
            onChange={(e) => setNomeCliente(e.target.value)}
            sx={{ marginTop: 2 }}
          />

          <TextField
            required
            type="date"
            size="small"
            label="Data de Nascimento"
            name="dataNascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ marginTop: 2 }}
          />

          <TextField
            required
            label="Email"
            size="small"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginTop: 2 }}
          />

          <TextField
            required
            label="Nome do Animal"
            size="small"
            name="nomeAnimal"
            value={nomeAnimal}
            onChange={(e) => setNomeAnimal(e.target.value)}
            sx={{ marginTop: 2 }}
          />

          <TextField
            required
            label="Idade"
            size="small"
            name="idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            sx={{ marginTop: 2 }}
          />

          <TextField
            required
            label="Espécie"
            size="small"
            name="especie"
            value={especie}
            onChange={(e) => setEspecie(e.target.value)}
            sx={{ marginTop: 2 }}
          />
          <TextField
            select
            required
            label="Sexo"
            size="small"
            name="sexo"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            sx={{ marginTop: 2 }}
          >
            <MenuItem value="Macho">Macho</MenuItem>
            <MenuItem value="Fêmea">Fêmea</MenuItem>
          </TextField>

          <TextField
            label="Peso"
            size="small"
            name="peso"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            sx={{ marginTop: 2 }}
          />

          <TextField
            label="Motivo da Consulta"
            size="small"
            name="motivoConsulta"
            value={motivoConsulta}
            onChange={(e) => setMotivoConsulta(e.target.value)}
            multiline
            rows={4}
            sx={{ marginTop: 2 }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleAgendarClick}
            disabled={!isFormComplete()}
            sx={{ marginTop: 2 }}
          >
            Agendar
          </Button>
        </Box>
          <Box sx={{ width: "60%", ml: 1 }}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={"pt-br"}
              >
              <DateCalendar
                label="Data"
                value={dia}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
                sx={{ marginTop: 2 }}
                />

                {servico && horariosDisponiveis.map((horario) => (
              <Button
                variant={isHorarioSelecionado(horario) ? "contained" : "outlined"}
                disabled={!horariosDisponiveis}
                key={horario}
                value={horario}
                onClick={() => {
                  setHora(horario);
                  setHorarioSelecionado(true);
                }}
              >
                {horario}
              </Button>
              ))}
            </LocalizationProvider>
          </Box>
      </Box>
    </Box>
  );
};

export default AgendamentoConsulta;

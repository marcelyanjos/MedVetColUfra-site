import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Link,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useParams } from "react-router-dom";
import dayjs from 'dayjs';
import styles from "./style";
import api from "../../../api";

const card1 = {
  border: "1px solid #CFD0D7",
  maxHeight: "95%",
  borderRadius: "4px",
  p: 1,
};

export default function NovaEscala() {
  const { id } = useParams();
  const [dia, setDia] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [profissional, setProfissional] = useState({
    matricula: "",
    dia: "",
  });

  useEffect(() => {
    // Se existe o id, carrega as informações do profissional para editar
    if (id) {
      api.get(`/api/escala/${id}`).then((response) => {
        const escalaData = response.data;
        setProfissional({
          matricula: escalaData.matricula,
          dia: escalaData.dia,
        });
      });
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfissional((prevProfissional) => ({
      ...prevProfissional,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setDia(date);
    setProfissional((prevProfissional) => ({
        ...prevProfissional,
        dia: date ? dayjs(date).format('YYYY-MM-DD') : '', // If "date" is null, set an empty string
      }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (id) {
        // Edita os dados do profissional existente
        await api.put(`/api/escala/${id}`, {
          ...profissional,
        });
        setOpenSnackbar(true);
        setSnackbarMessage("Dados do profissional atualizado com sucesso!");
        setSnackbarSeverity("success");
      } else {
        // Envia os dados do profissional para o servidor
        await api.post("/api/escala", {
          ...profissional,
        });
        setOpenSnackbar(true);
        setSnackbarMessage("Dados do profissional salvo com sucesso!");
        setSnackbarSeverity("success");
        // Limpa os dados do profissional
        setProfissional({
          matricula: "",
          dia: "",
        });
      }
    } catch (error) {
      console.error(error);
      setOpenSnackbar(true);
      setSnackbarMessage(
        "Erro ao salvar dados do profissional. Tente novamente."
      );
      setSnackbarSeverity("error");
    }
  };

  return (
    <Box sx={styles.index_box2}>
      <Typography
        sx={{ mb: 3 }}
        fontFamily={"Public Sans"}
        fontWeight={700}
        color="#212B36"
        variant="h5"
      >
        Nova Escala
      </Typography>
      <Box sx={styles.table_box}>
        <Paper sx={styles.modal_paper}>
          <Box sx={{ height: "100%", minHeight: "360px", p: 2 }}>
            <Grid sx={styles.modal_box} container>
              <Grid xs={12} sm={6} ls={12} sx={card1}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      sx={{ width: "100%" }}
                      size="small"
                      autoComplete="username"
                      type="string"
                      name="matricula"
                      label="Matrícula"
                      margin="normal"
                      value={profissional.matricula}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={12} sm={6} ls={12} sx={card1}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale={"pt-br"}
                >
                  <DateCalendar
                    label="Data"
                    value={dia}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{ marginTop: 2, bgcolor: "#ffff" }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid container>
              <Button variant="contained" onClick={handleSubmit}>
                Enviar
              </Button>
              <Button
                variant="contained"
                component={Link}
                href="/admin/dashboard/profissionais/escala"
                color="secondary"
              >
                Cancelar
              </Button>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

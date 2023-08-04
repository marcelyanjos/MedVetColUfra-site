import {
  Box,
  Typography,
  TextField,
  Grid,
  Divider,
  Button,
  Link,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import AddIcon from "@mui/icons-material/Add";
import styles from "./style";
import api from "../../../api";
import { useNavigate } from "react-router-dom";

export default function Escala() {
  const [dia, setDia] = useState(null);
  const navigate = useNavigate();
  const handleDateChange = (date) => {
    setDia(date);
  };

  const [rows, setRows] = useState([]);
  const [servicoTipos, setServicoTipos] = useState([]);
  const [isProfessionalsEmpty, setIsProfessionalsEmpty] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/escala");
        const escalas = response.data;

        const updatedFormularios = await Promise.all(
          escalas.map(async (escala) => {
            const { id_escala, matricula } = escala;
            const dia = format(new Date(escala.dia), "dd/MM/yyyy");
            const profissionalResponse = await api.get(
              `/api/profissionais/${matricula}`
            );
            const profissional = profissionalResponse.data[0];

            const servicoResponse = await api.get(
              `/api/servicos/${profissional.id_servicos}`
            );
            const servico = servicoResponse.data;

            return {
              id: id_escala,
              nome: profissional.nome,
              dia: dia,
              servico: servico.tipo_servico,
            };
          })
        );

        setRows(updatedFormularios);
        console.log("rows", updatedFormularios);

        // Fetch all service types
        const serviceTypesResponse = await api.get("/api/servicos");
        setServicoTipos(serviceTypesResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleAddEscalaClick = () => {
    if (rows.length === 0) {
      // Check if professionals list is empty
      setIsProfessionalsEmpty(true);
      alert("Adicionar profissionais a lista do banco")
    } else {
      setIsProfessionalsEmpty(false);
      navigate("/admin/dashboard/profissionais/escala/new");
    }
  };

  const filterProfissionaisByDate = () => {
    if (!dia) return [];

    return rows.filter(
      (row) => row.dia === format(new Date(dia), "dd/MM/yyyy")
    );
  };

  const groupProfissionaisByServico = () => {
    const filteredProfissionais = filterProfissionaisByDate();

    const groupedProfissionais = filteredProfissionais.reduce(
      (acc, profissional) => {
        if (!acc[profissional.servico]) {
          acc[profissional.servico] = [];
        }

        acc[profissional.servico].push(profissional);
        return acc;
      },
      {}
    );

    return groupedProfissionais;
  };

  return (
    <Box sx={{ minHeight: "80vh" }}>
      <Box sx={styles.index_box}>
        <Typography
          fontFamily={"Public Sans"}
          fontWeight={700}
          color="#212B36"
          variant="h5"
        >
          Escala
        </Typography>
        <Button
          sx={styles.modal_button}
          variant="outlined"
          color="primary"
          onClick={handleAddEscalaClick}
          startIcon={<AddIcon />}
        >
          Adicionar nova escala
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
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

        <Grid item xs={12} sm={12} md={6}>
          {dia ? (
            <>
              {servicoTipos.map((servico) => (
                <div key={servico.id} style={{ marginBottom: "10px" }}>
                  <Typography variant="h6">{servico.tipo_servico}</Typography>
                  <Divider />
                  {groupProfissionaisByServico()[servico.tipo_servico]?.map(
                    (profissional) => (
                      <Typography key={profissional.id}>
                        {profissional.nome || "Nenhum profissional escalado"}
                      </Typography>
                    )
                  )}
                </div>
              ))}
            </>
          ) : (
            // Show all service types when no date is selected
            <>
              <Typography variant="h6">Tipos de Serviço</Typography>
              <Divider />
              {servicoTipos.map((servico) => (
                <Typography key={servico.id}>{servico.tipo_servico}</Typography>
              ))}
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

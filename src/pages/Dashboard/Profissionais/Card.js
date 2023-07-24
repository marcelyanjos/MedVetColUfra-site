import {
  TextField,
  Grid,
  IconButton,
  Box,
  Typography,
  Button,
  MenuItem,
  Link,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { decode } from "base-64";
import styles from "./style";
import api from "../../../api";

const card1 = {
  border: "1px solid #CFD0D7",
  maxHeight: "95%",
  borderRadius: "4px",
  p: 1,
};
const card2 = {
  border: "1px solid #CFD0D7",
  maxHeight: "95%",
  borderRadius: "4px",
  p: 1,
};
export default function Card1() {
  const [checked, setChecked] = React.useState([0]);
  const [files, setFiles] = useState([]);

  const navigate = useNavigate();
  const [newImage, setNewImage] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const { id } = useParams(); // Adiciona o parâmetro id

  const [profissional, setProfissional] = useState({
    nome: "",
    matricula: "",
    data_nasc: "",
    profissao: "",
    id_servicos: "",
  });

  useEffect(() => {
    // Se existe o id, carrega as informações do profissional para editar
    if (id) {
      api.get(`/api/profissionais/${id}`).then((response) => {
        const profissionalData = response.data;
        setNewImage(false);
        setProfissional({
          nome: profissionalData.nome,
          matricula: profissionalData.matricula,
          data_nasc: profissionalData.data_nasc,
          profissao: profissionalData.profissao,
          id_servicos: profissionalData.id_servicos,
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Verifica se a imagem existe antes de convertê-la para base64
      if (id) {
        // Edita os dados do profissional existente
        await api.put(`/api/profissionais/${id}`, {
          ...profissional,
        });
        setOpenSnackbar(true);
        setSnackbarMessage("Dados do profissional atualizado com sucesso!");
        setSnackbarSeverity("success");
      } else {
        // Envia os dados do profissional para o servidor
        await api.post("/api/profissionais", {
          ...profissional,
        });
        setOpenSnackbar(true);
        setSnackbarMessage("Dados do profissional salvo com sucesso!");
        setSnackbarSeverity("success");
        // Limpa os dados do profissional
        setProfissional({
          nome: "",
          matricula: "",
          data_nasc: "",
          profissao: "",
          id_servicos: "",
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
    <Box sx={{ height: "100%", minHeight: "360px", p: 2 }}>
      <Grid sx={styles.modal_box} container>
        <Grid xs={12} sm={6} ls={12} sx={card1}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                sx={{
                  width: "100%",
                }}
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
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                sx={{
                  width: "100%",
                }}
                size="small"
                autoComplete="username"
                type="string"
                name="nome"
                label="Nome"
                margin="normal"
                value={profissional.nome}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                sx={{
                  width: "100%",
                }}
                size="small"
                autoComplete="username"
                type="Date"
                name="data_nasc"
                label="Data de Nascimento"
                margin="normal"
                value={profissional.data_nasc}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                sx={{
                  width: "100%",
                }}
                size="small"
                autoComplete="username"
                type="string"
                name="profissao"
                label="Profissão"
                margin="normal"
                value={profissional.profissao}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                select
                required
                size="small"
                label="Serviço"
                name="id_servicos"
                value={profissional.id_servicos}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              >
                <MenuItem value="1">Cardiologia</MenuItem>
                <MenuItem value="2">Clínica Geral</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Button variant="contained" onClick={handleSubmit}>
          Enviar
        </Button>
        <Button
          variant="contained"
          component={Link}
          href="/admin/dashboard/profissionais"
          color="secondary"
        >
          Cancelar
        </Button>
      </Grid>
    </Box>
  );
}

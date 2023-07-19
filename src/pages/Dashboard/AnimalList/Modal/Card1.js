import {
  TextField,
  Grid,
  IconButton,
  Box,
  Typography,
  Button,
  MenuItem,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { decode } from "base-64";
import styles from "../style";
import api from "../../../../api";

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
export default function Card1({handleClose}) {
  const [checked, setChecked] = React.useState([0]);
  const [files, setFiles] = useState([]);

  const navigate = useNavigate();
  const [newImage, setNewImage] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const { id } = useParams(); // Adiciona o parâmetro id

  const [animal, setAnimal] = useState({
    nome: "",
    especie: "",
    sexo: "",
    idade: "",
    peso: "",
    imagem: "",
  });

  useEffect(() => {
    // Se existe o id, carrega as informações do animal para editar
    if (id) {
      api.get(`/api/animals/${id}`).then((response) => {
        const animalData = response.data;
        setNewImage(false);
        setAnimal({
          nome: animalData.nome,
          especie: animalData.especie,
          sexo: animalData.sexo,
          idade: animalData.idade,
          peso: animalData.peso,
          imagem: animalData.imagem,
        });
      });
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "imagem") {
      setNewImage(true);
    }
    setAnimal((prevAnimal) => ({
      ...prevAnimal,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Verifica se a imagem existe antes de convertê-la para base64
      const base64 =
        animal.imagem && (await convertImageToBase64(animal.imagem));

      if (id) {
        // Edita os dados do animal existente
        await api.put(`/api/animals/${id}`, {
          ...animal,
          imagem: base64,
        });
        setOpenSnackbar(true);
        setSnackbarMessage("Dados do animal atualizado com sucesso!");
        setSnackbarSeverity("success");
      } else {
        // Envia os dados do animal para o servidor
        await api.post("/api/animals", {
          ...animal,
          newImage,
          imagem: base64,
        });
        setOpenSnackbar(true);
        setSnackbarMessage("Dados do animal salvo com sucesso!");
        setSnackbarSeverity("success");
        // Limpa os dados do animal
        setAnimal({
          nome: "",
          especie: "",
          sexo: "",
          idade: "",
          peso: "",
          imagem: "",
        });
      }
    } catch (error) {
      console.error(error);
      setOpenSnackbar(true);
      setSnackbarMessage("Erro ao salvar dados do animal. Tente novamente.");
      setSnackbarSeverity("error");
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  // Drag and drop functionality
  const onDrop = useCallback(
    (acceptedFiles) => {
      setAnimal({ ...animal, imagem: acceptedFiles[0] });
      setNewImage(true);
    },
    [animal]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // clean up
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <Box sx={{ height: "90%" }}>
      <Grid sx={styles.modal_box} container>
        <Grid xs={12} sm={6} ls={12} sx={card1} container>
          <Grid item xs={12} sm={6} lg={12}>
            <Typography>Nome</Typography>
            <TextField
              fullWidth
              size="small"
              autoComplete="username"
              type="text"
              name="nome"
              value={animal.nome}
              onChange={handleChange}
            />
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                select
                required
                size="small"
                label="Espécie"
                name="especie"
                value={animal.especie}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              >
                <MenuItem value="canino">Cachorro</MenuItem>
                <MenuItem value="felino">Gato</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                sx={{
                  width: "100%",
                }}
                size="small"
                autoComplete="username"
                type="text"
                name="idade"
                label="idade"
                margin="normal"
                value={animal.idade}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                select
                required
                size="small"
                label="Sexo"
                name="sexo"
                value={animal.sexo}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              >
                <MenuItem value="macho">Macho</MenuItem>
                <MenuItem value="femea">Fêmea</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                sx={{
                  width: "100%",
                }}
                size="small"
                type="text"
                name="peso"
                label="peso"
                margin="normal"
                value={animal.peso}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} sm={6} ls={12} sx={card2} container>
          <div
            {...getRootProps()}
            style={{
              height: "98%",
              width: "95%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              border: "1px dashed #CFD0D7",
              borderRadius: "4px",
              padding: "16px",
              backgroundColor: isDragActive ? "#F4F5F7" : "transparent",
            }}
          >
            <input {...getInputProps()} />
            {animal.imagem ? (
              <img
                src={
                  newImage
                    ? URL.createObjectURL(animal.imagem)
                    : `data:image/jpeg;base64,${decode(animal.imagem)}`
                }
                alt="Animal"
                style={{
                  maxWidth: "90%",
                  maxHeight: "90%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <div style={{ textAlign: "center" }}>
                <InsertDriveFileOutlinedIcon fontSize="large" />
                <Typography variant="body1">
                  Arraste e solte a imagem aqui ou clique para fazer o upload
                </Typography>
              </div>
            )}
            {animal.imagem && (
              <>
                {newImage ? (
                  <Typography variant="body1">{animal.imagem.name}</Typography>
                ) : (
                  <Typography variant="body1">{animal.nome}</Typography>
                )}
                <IconButton
                  aria-label="delete"
                  onClick={() => setAnimal({ ...animal, imagem: "" })}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </div>
        </Grid>
      </Grid>
      <Grid container>
        <Button variant="contained" onClick={handleSubmit}>
          Enviar
        </Button>
        <Button
          variant="contained"
          onClick={handleClose}
          color="secondary"
        >
          Cancelar
        </Button>
      </Grid>
    </Box>
  );
}

import {
  TextField,
  Box,
  Grid,
  Link,
  Typography,
  Button,
  MenuItem,
} from "@mui/material";
import { decode } from "base-64";
import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import styles from "../style";
import api from "../../../../api";

const card1 = {
  border: "1px solid #CFD0D7",
  maxHeight: "95%",
  borderRadius: "4px",
  p: 1,
};

export default function Card1() {
  const [client, setClient] = useState({
    nome: "",
    data_nasc: "",
    email: "",
    moradia: "",
    ocupacao: "",
  });

  const [animal, setAnimal] = useState({
    id_animal: "",
    nome: "",
    especie: "",
    sexo: "",
    idade: "",
    peso: "",
    imagem: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [animalsList, setAnimalsList] = useState([]);

  useEffect(() => {
    // Fetch the list of animals from your API endpoint
    api.get("/api/animals").then((response) => {
      setAnimalsList(response.data);
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Find the selected animal from the animalsList based on its id
    const selectedAnimal = animalsList.find(
      (animalOption) => animalOption.id === value
    );
    setAnimal((prevAnimal) => ({
      ...prevAnimal,
      [name]: value,
      id_animal: value,
      nome: selectedAnimal.nome,
      especie: selectedAnimal.especie,
      sexo: selectedAnimal.sexo,
      idade: selectedAnimal.idade,
      peso: selectedAnimal.peso,
      imagem: selectedAnimal.imagem,
    }));
  };

  const handleClientChange = (event) => {
    const { name, value } = event.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const generateProtocol = () => {
    const randomString = Math.random().toString(36).substring(2, 8);
    return randomString.toUpperCase();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Submit client data to the client API endpoint
      const clientResponse = await api.post("/api/clientes", {
        nome: client.nome,
        data_nasc: client.data_nasc,
        email: client.email,
      });

      const createdClientId = clientResponse.data.id_cliente;
      const currentDate = format(new Date(), "yyyy-MM-dd");
      // Submit adoption form data to the adoption-forms API endpoint
      await api.post("/api/adoption-forms", {
        id_cliente: createdClientId,
        id_animal: animal.id_animal,
        protocolo: generateProtocol(),
        situacao: "Em andamento",
        tipo_moradia: client.moradia,
        ocupacao: client.ocupacao,
        data_envio: currentDate,
      });

      setOpenSnackbar(true);
      setSnackbarMessage("Dados enviados com sucesso!");
      setSnackbarSeverity("success");
      setClient({
        nome: "",
        data_nasc: "",
        email: "",
        moradia: "",
        ocupacao: "",
      })
      setAnimal({
        id_animal: "",
        nome: "",
        especie: "",
        sexo: "",
        idade: "",
        peso: "",
        imagem: "",
      })
    } catch (error) {
      console.error(error);
      setOpenSnackbar(true);
      setSnackbarMessage("Erro ao enviar dados. Tente novamente.");
      setSnackbarSeverity("error");
    }
  };

  return (
    <Box sx={{ height: "100%", minHeight: "360px", p: 2 }}>
      {/* <Box > */}
      <Grid sx={styles.modal_box} container>
        <Grid xs={12} sm={6} ls={12} sx={card1} item>
          <Typography variant="h4">Adotante</Typography>
          <Grid item xs={12} sm={12} lg={12}>
            <TextField
              fullWidth
              required
              size="small"
              label="Nome"
              type="text"
              name="nome"
              variant="outlined"
              value={client.nome}
              onChange={handleClientChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <TextField
              fullWidth
              required
              size="small"
              label="Data de nascimento"
              type="date"
              name="data_nasc"
              value={client.data_nasc}
              onChange={handleClientChange}
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <TextField
              sx={{
                width: "100%",
              }}
              size="small"
              type="text"
              name="email"
              label="Email"
              margin="normal"
              value={client.email}
              onChange={handleClientChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <TextField
              sx={{
                width: "100%",
              }}
              size="small"
              type="text"
              name="moradia"
              label="Moradia"
              margin="normal"
              value={client.moradia}
              onChange={handleClientChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <TextField
              sx={{
                width: "100%",
              }}
              size="small"
              type="text"
              name="ocupacao"
              label="Ocupação"
              margin="normal"
              value={client.ocupacao}
              onChange={handleClientChange}
            />
          </Grid>
        </Grid>
        <Grid xs={12} sm={6} ls={12} sx={card1} item>
          <Typography variant="h4">Animal Adotado</Typography>
          <Grid item xs={12} sm={12} lg={12}>
            <TextField
              select
              sx={{
                width: "100%",
              }}
              size="small"
              name="id_animal"
              label="Animal"
              margin="normal"
              value={animal.id_animal ?? ""}
              onChange={handleChange}
            >
              {animalsList.map((animalOption) => (
                <MenuItem key={animalOption.id} value={animalOption.id}>
                  {animalOption.nome} - {animalOption.especie}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            {/* Display the selected animal's details */}
            <Typography>Nome: {animal.nome}</Typography>
            <Typography>Especie: {animal.especie}</Typography>
            <Typography>Sexo: {animal.sexo}</Typography>
            <Typography>Idade: {animal.idade} anos</Typography>
            <Typography>Peso: {animal.peso}kg</Typography>
            {animal.imagem && (
              <img
                style={{width:'100%', objectFit:'contain'}}
                src={`data:image/jpeg;base64,${decode(animal.imagem)}`}
                alt="Animal"
              />
            )}
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
          href="/admin/dashboard/adocoes"
          color="secondary"
        >
          Cancelar
        </Button>
      </Grid>
      {/* </Box> */}
    </Box>
  );
}

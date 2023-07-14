import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  Button,
  Container,
  Card,
  CircularProgress,
  Box,
} from "@mui/material";
import { decode } from "base-64";
import api from "../../../api";
import colors from "../../../colors";

function AnimalDetails(props) {
  const [animal, setAnimal] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/api/animals/${id}`)
      .then((response) => {
        setAnimal(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!animal) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <Typography variant="h3">Loading...</Typography>
      </div>
    );
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          height: "100%",
          borderRadius: "10px",
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            height: "100%",
            position: "relative",
          }}
        >
          <img
            src={`data:image/${
              animal.imagem.endsWith("png")
                ? "png"
                : animal.imagem.endsWith("jpeg")
                ? "jpeg"
                : "jpg"
            };base64,${decode(animal.imagem)}`}
            alt={animal.nome}
            style={{
              width: "100%",
              objectFit: "cover",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
            }}
          />
          <Typography
            sx={{
              textTransform: "lowercase",
              "&:first-letter": {
                textTransform: "uppercase",
              },
              position: "absolute",
              top: "20px",
              fontSize: "24px",
              fontWeight: "bold",
              width: "35%",
              textAlign: "center",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
              margin: 0,
              // padding: "8px",
              background: "rgba(255, 255, 255, 0.8)",
              color: colors.green[4],
            }}
          >
            {animal.nome}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Grid item>
            <Grid item sx={{ mb: 2 }}>
              <Typography component={"span"} variant={"body2"} sx={{ fontSize: "20px" }}>
                Sobre o Pet
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                bgcolor: colors.green[5],
                color: "#fff",
                p: 2,
                borderRadius: 4,
              }}
            >
              <Typography variant={"body2"}>Especie: {animal.especie}</Typography>
              <Typography variant={"body2"}>Sexo: {animal.sexo}</Typography>
              <Typography variant={"body2"}>
                Idade: {animal.idade} anos
              </Typography>
              <Typography variant={"body2"}>Peso: {animal.peso} kg</Typography>
            </Grid>
          </Grid>
          <Grid item sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              href={`adoption-form/${animal.id_animal}`}
              variant="contained"
              sx={{
                bgcolor: colors.green[4],
                boxShadow: "none",
                "&:hover": {
                  bgcolor: colors.green[5],
                  boxShadow: "none",
                },
              }}
            >
              Adotar
            </Button>
            <Button
              href="/adocao"
              variant="outlined"
              sx={{
                borderColor: colors.green[4],
                color: colors.green[4],
                "&:hover": {
                  borderColor: colors.green[5],
                  color: colors.green[5],
                  bgcolor: colors.green[0],
                },
              }}
            >
              Voltar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AnimalDetails;

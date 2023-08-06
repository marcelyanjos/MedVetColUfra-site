import React from "react";
import { Box, Typography } from "@mui/material";
import theme from "../../theme";
export default function Info() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pt: 3,
          pl: 3,
          pr: 3,
        }}
      >
        <Typography
          sx={{
            pt: 2,
            pb: 1,
            color: "#383838",
            fontSize: 30,
            fontWeight: "300",
            fontFamily: "Open Sans, sans-serif",
          }}
        >
          Canil/Gatil UFRA
        </Typography>
        <Typography
          sx={{
            [theme.breakpoints.up("md")]: {
              width: "90%",
            },
            fontSize: 15,
            color: "#494a4a",
            textAlign: "center",
            fontFamily: "Open Sans, sans-serif",
          }}
        >
          O Canil/Gatil da UFRA é um espaço que tem como principal função servir
          de apoio para atividades de ensino e pesquisa para os alunos de
          Medicina Veterinária e Zootecnia da Ufra, não sendo um abrigo de
          animais.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pt: 2,
          pb: 3,
          pl: 3,
          pr: 3,
        }}
      >
        <Typography
          sx={{
            pb: 1,
            color: "#383838",
            fontSize: 24,
            fontWeight: "300",
            fontFamily: "Open Sans, sans-serif",
          }}
        >
          Adote não compre!
        </Typography>
        <Typography
          component={"span"}
          variant={"body2"}
          sx={{
            [theme.breakpoints.up("md")]: {
              width: "90%",
            },
            fontSize: 15,
            color: "#494a4a",
            textAlign: "center",
            fontFamily: "Open Sans, sans-serif",
          }}
        >
          Adotar um animal é valorizar a vida. Um cão ou gato é capaz de sentir
          emoções – como dor e alegria/excitação – e por isso, sofre tanto
          quanto nós, humanos. É recuperar uma vida literalmente jogada fora. Ao
          adotar um animal carente, você ensina ao seu filho, às crianças com
          quem você convive, verdadeiros valores de responsabilidade,
          comprometimento e, sobretudo, humanidade.
          {<p />}
          Ao adotar, você ajuda a reduzir o número de cães e gatos abandonados.
          Geralmente os animais de rua ou de abrigos já passaram por muito
          sofrimento e tudo o que eles precisam é de um bom lar para serem
          felizes de verdade.
        </Typography>
      </Box>
    </>
  );
}

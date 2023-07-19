// Rotas estilizadas para menu
import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
// import { ReactComponent as HomeIcon } from "../../assets/Home_light.svg";
import { ReactComponent as SthetoscopeIcon } from "../../assets/stethoscope_icon.svg";
import { ReactComponent as Adoption } from "../../assets/Paw_light.svg";
import { ReactComponent as Article } from "../../assets/Article_light.svg";
const routes = [
  {
    nome: "Home",
    icon: <HomeRoundedIcon fontSize="large" />,
    link: "app",
  },
  {
    nome: "Canil/Gatil",
    icon: <Adoption />,
    link: "",
    sections: [
      {
        nome: "Animais do canil/gatil",
        link: "animais",
      },
      {
        nome: "Adoção",
        link: "adocoes",
      },
      {
        nome: "Informações site",
        link: "",
      },
    ],
  },
  {
    nome: "Profissionais",
    icon: <SthetoscopeIcon />,
    link: "profissionais",
  },

  {
    nome: "Artigos",
    icon: <Article />,
    link: "artigos",
  },
];
export default routes;

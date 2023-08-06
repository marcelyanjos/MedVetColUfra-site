// Rotas estilizadas para menu
import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
// import { ReactComponent as HomeIcon } from "../../assets/Home_light.svg";
import { ReactComponent as SthetoscopeIcon } from "../../assets/stethoscope_icon.svg";
import { ReactComponent as HeartIcon } from "../../assets/Heart.svg";
import { ReactComponent as Adoption } from "../../assets/Paw_light.svg";
import { ReactComponent as Article } from "../../assets/Article_light.svg";
const routes = [
  {
    nome: "Home",
    icon: <HomeRoundedIcon fontSize="large" />,
    link: "/admin/dashboard/app",
  },
  {
    nome: "Canil/Gatil",
    icon: <Adoption />,
    link: "",
    sections: [
      {
        nome: "Animais do canil/gatil",
        link: "/admin/dashboard/animais",
      },
      {
        nome: "Adoção",
        link: "/admin/dashboard/adocoes",
      },
      {
        nome: "Informações site",
        link: "/admin/dashboard/canilInfo",
      },
    ],
  },
  {
    nome: "HOVET",
    icon: <HeartIcon />,
    link: "",
    sections: [
      {
        nome: "Agendamentos",
        link: "/admin/dashboard/agendamentos",
      },
      {
        nome: "Informações HOVET",
        link: "/admin/dashboard/hovetInfo",
      },
    ],
  },
  {
    nome: "Profissionais",
    icon: <SthetoscopeIcon />,
    link: "",
    sections: [
      {
        nome: "Lista de Profissionais",
        link: "/admin/dashboard/profissionais",
      },
      {
        nome: "Escala",
        link: "/admin/dashboard/profissionais/escala",
      },
      {
        nome: "Serviços",
        link: "/admin/dashboard/profissionais/servicos",
      },
    ],
  },
  {
    nome: "Artigos",
    icon: <Article />,
    link: "/admin/dashboard/artigos",
  },
];
export default routes;

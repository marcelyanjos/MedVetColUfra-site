// Rotas estilizadas para menu
import React from "react";
import Home from "../pages/home";
import Animais from "../pages/AdoptionList";
import Medicamentos from "../pages/MedicationList";
import { ReactComponent as HomeIcon } from "../assets/Home_light.svg";
import { ReactComponent as MedicationIcon } from "../assets/Medication_light.svg";
import { ReactComponent as Adoption } from "../assets/Paw_light.svg";
import { ReactComponent as Article } from "../assets/Article_light.svg";
const routes = [
  {
    nome: "Home",
    icon: <HomeIcon />,
    link: "app",
  },
  {
    nome: "Animais do Canil/Gatil",
    icon: <Adoption />,
    link: "animais",
  },
  {
    nome: "Medicamentos em estoque",
    icon: <MedicationIcon />,
    link: "medicamentos",
  },

  {
    nome: "Artigos",
    icon: <Article />,
    link: "artigos",
  },
];
export default routes;

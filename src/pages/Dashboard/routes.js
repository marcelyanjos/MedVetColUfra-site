import login from "./Login";
import signUp from "./SignUp";
import admin from "./home";
import animais from "./AnimalList";
import animaisTabela from "./AnimalList/Table";
import adocoes from "./AdoptionList";
import perfil from "./Profile";
import profissionais from "./Profissionais";
import profissionaisTabela from "./Profissionais/Table";
import artigos from "./Artigos";
import escala from "./Profissionais/Escala";
import servicos from "./Profissionais/Servicos";
import artigosTabela from "./Artigos/table";
import editorArticle from "./Artigos/editor";
import agendamento from "./AgendamentoList";
import agendamentoTable from './AgendamentoList/table'
import canilInfo from "./CanilSections";
import canilInfoTabela from "./CanilSections/table";
import editorCanil from "./CanilSections/editor";
import hovetInfo from "./HovetSections";
import hovetInfoTabela from "./HovetSections/table";
import editorHovet from "./HovetSections/editor";
// import drawer from "../../Drawer";
import drawer from "../../Components/DrawerAdmin";

const SignUp = signUp;
const Login = login;
const Admin = admin;
const Pets = animais;
const PetsTable = animaisTabela;
const Adocoes = adocoes;
const Profile = perfil;
const Escala = escala;
const Servicos = servicos;
const Professionals = profissionais;
const ProfessionalsTable = profissionaisTabela;
const ArticleList = artigos;
const CanilInfo = canilInfo;
const CanilInfoTable = canilInfoTabela;
const EditorCanil = editorCanil;
const HovetInfo = hovetInfo;
const HovetInfoTable = hovetInfoTabela;
const EditorHovet = editorHovet;
const ArticleTable = artigosTabela;
const EditorArticle = editorArticle;
const Agendamento = agendamento;
const AgendamentoTable = agendamentoTable;
const Drawer = drawer;

export {
  SignUp,
  Login,
  Admin,
  Agendamento,
  AgendamentoTable,
  Pets,
  PetsTable,
  Adocoes,
  Profile,
  Escala,
  Servicos,
  Professionals,
  ProfessionalsTable,
  ArticleList,
  CanilInfo,
  CanilInfoTable,
  EditorCanil,
  HovetInfo,
  HovetInfoTable,
  EditorHovet,
  ArticleTable,
  EditorArticle,
  Drawer,
};

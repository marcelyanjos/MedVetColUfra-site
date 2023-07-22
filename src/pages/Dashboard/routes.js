import login from "./Login";
import signUp from "./SignUp";
import admin from "./home";
import animais from "./AnimalList";
import animaisTabela from "./AnimalList/Table";
import adocoes from "./AdoptionList";
import perfil from "./Profile";
import profissionais from "./Profissionais";
import artigos from "./Artigos";
import artigosTabela from "./Artigos/table";
import editorArticle from "./Artigos/editor";
import canilInfo from "./CanilSections";
import canilInfoTabela from "./CanilSections/table";
import editorCanil from "./CanilSections/editor";
// import drawer from "../../Drawer";
import drawer from "../../Components/DrawerAdmin";

const SignUp = signUp;
const Login = login;
const Admin = admin;
const Pets = animais;
const PetsTable = animaisTabela;
const Adocoes = adocoes;
const Profile = perfil;
const Professionals = profissionais;
const ArticleList = artigos;
const CanilInfo = canilInfo;
const CanilInfoTable = canilInfoTabela;
const ArticleTable = artigosTabela;
const EditorArticle = editorArticle;
const EditorCanil = editorCanil;
const Drawer = drawer;

export {
  SignUp,
  Login,
  Admin,
  Pets,
  PetsTable,
  Adocoes,
  Profile,
  Professionals,
  ArticleList,
  CanilInfo,
  CanilInfoTable,
  EditorCanil,
  ArticleTable,
  EditorArticle,
  Drawer,
};

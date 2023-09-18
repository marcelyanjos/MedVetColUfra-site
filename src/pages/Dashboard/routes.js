import adocoes from './AdoptionList'
import novaAdocao from './AdoptionList/NovaAdocao'
import adocoesTabela from './AdoptionList/Table'
import agendamento from './AgendamentoList'
import editorAgendamento from './AgendamentoList/NovoAgendamento'
import agendamentoTable from './AgendamentoList/table'
import animais from './AnimalList'
import animaisTabela from './AnimalList/Table'
import artigos from './Blog'
import editorArticle from './Blog/editor'
import artigosTabela from './Blog/table'
import canilInfo from './CanilSections'
import editorCanil from './CanilSections/editor'
import canilInfoTabela from './CanilSections/table'
import destaque from './Destaques'
import destaqueTable from './Destaques/Table'
import destaqueEditor from './Destaques/editor'
import hovetInfo from './HovetSections'
import editorHovet from './HovetSections/editor'
import hovetInfoTabela from './HovetSections/table'
import login from './Login'
import perfil from './Profile'
import profissionais from './Profissionais'
import escala from './Profissionais/Escala'
import servicos from './Profissionais/Servicos'
import profissionaisTabela from './Profissionais/Table'
import signUp from './SignUp'
import admin from './home'
// import drawer from "../../Drawer";
import drawer from '../../Components/DrawerAdmin'

const SignUp = signUp
const Login = login
const Admin = admin
const Pets = animais
const PetsTable = animaisTabela
const Adocoes = adocoes
const AdocoesTable = adocoesTabela
const NovaAdocao = novaAdocao
const Profile = perfil
const Escala = escala
const Servicos = servicos
const Professionals = profissionais
const ProfessionalsTable = profissionaisTabela
const ArticleList = artigos
const CanilInfo = canilInfo
const CanilInfoTable = canilInfoTabela
const EditorCanil = editorCanil
const HovetInfo = hovetInfo
const HovetInfoTable = hovetInfoTabela
const EditorHovet = editorHovet
const ArticleTable = artigosTabela
const EditorArticle = editorArticle
const Agendamento = agendamento
const Destaque = destaque
const DestaqueEditor = destaqueEditor
const DestaqueTable = destaqueTable
const AgendamentoTable = agendamentoTable
const EditorAgendamento = editorAgendamento
const Drawer = drawer

export {
  Admin,
  Adocoes,
  AdocoesTable,
  Agendamento,
  AgendamentoTable,
  ArticleList,
  ArticleTable,
  CanilInfo,
  CanilInfoTable,
  Destaque,
  DestaqueEditor,
  DestaqueTable,
  Drawer,
  EditorAgendamento,
  EditorArticle,
  EditorCanil,
  EditorHovet,
  Escala,
  HovetInfo,
  HovetInfoTable,
  Login,
  NovaAdocao,
  Pets,
  PetsTable,
  Professionals,
  ProfessionalsTable,
  Profile,
  Servicos,
  SignUp,
}

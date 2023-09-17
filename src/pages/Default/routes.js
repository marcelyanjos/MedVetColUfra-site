import header from '../../Components/Drawer'
import novoAgendamento from '../Dashboard/AgendamentoList/NovoAgendamento'
import { IndexAdocao, MenuAdocao } from './Adocao'
import formularioCliente from './Adocao/FormAdoptionInfo'
import { IndexAgendamento, MenuAgendamento } from './Agendamento'
import agendamentoCliente from './Agendamento/ListaCliente'
import blog from './Blog'
import canil from './Canil'
import hovet from './HOVET'
import login from './Login'
import home from './home'

const Header = header
const Home = home
const Hovet = hovet
const UserLogin = login
const Blog = blog
const Canil = canil
const Adocao = IndexAdocao
const FormularioCliente = formularioCliente
const AnimaisAdocao = MenuAdocao
const AgendamentoDefault = IndexAgendamento
const MenuAgenda = MenuAgendamento
const NovoAgendamento = novoAgendamento
const AgendamentosCliente = agendamentoCliente

export {
  Adocao,
  AgendamentoDefault,
  AgendamentosCliente,
  AnimaisAdocao,
  Blog,
  Canil,
  FormularioCliente,
  Header,
  Home,
  Hovet,
  MenuAgenda,
  NovoAgendamento,
  UserLogin,
}

import header from '../../Components/Drawer'
import home from './home'
import hovet from './HOVET'
import login from './Login'
import blog from './Blog'
import canil from './Canil'
import { IndexAdocao, MenuAdocao } from "./Adocao";
import { IndexAgendamento, MenuAgendamento } from "./Agendamento";
import novoAgendamento from './Agendamento/AddAgendamento'
import agendamentoCliente from './Agendamento/ListaCliente'


const Header = header;
const Home = home;
const Hovet = hovet;
const UserLogin = login;
const Blog = blog;
const Canil =canil;
const Adocao = IndexAdocao;
const AnimaisAdocao = MenuAdocao;
const AgendamentoDefault = IndexAgendamento;
const MenuAgenda = MenuAgendamento;
const NovoAgendamento = novoAgendamento;
const AgendamentosCliente = agendamentoCliente;

export {Header, Home,Hovet, UserLogin, Blog, Canil,Adocao, AnimaisAdocao, AgendamentoDefault, MenuAgenda, NovoAgendamento, AgendamentosCliente};
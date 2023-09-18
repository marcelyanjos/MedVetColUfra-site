import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import { getToken } from './CMS/Helpers'
import AuthProvider from './CMS/components/AuthProvider/AuthProvider'
import Dashboard from './pages/Dashboard'
import EditAnimal from './pages/Dashboard/AnimalList/ModalUser'
import NovaEscala from './pages/Dashboard/Profissionais/NovaEscala'
import NovoProfissional from './pages/Dashboard/Profissionais/NovoProfissional'
import {
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
} from './pages/Dashboard/routes'
import AnimalDetails from './pages/Default/Adocao/AnimalDetails'
import AnimalList from './pages/Default/Adocao/AnimalList'
import CheckAndAdopt from './pages/Default/Adocao/CheckAndAdopt'
import ClientForms from './pages/Default/Adocao/ClientForms'
import AdocaoInfo from './pages/Default/Adocao/Info'
import Article from './pages/Default/Blog/Article'
import {
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
} from './pages/Default/routes'
import './styles/App.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="" />} />
          <Route path="/" element={<Header />}>
            <Route index path="" element={<Home />} />
            <Route index path="hovet" element={<Hovet />} />
            <Route index path="blog" element={<Blog />} />
            <Route index path="blog/:id" element={<Article />} />
            <Route index path="canil" element={<Canil />} />
            <Route path="adocao" element={<Adocao />}>
              <Route index element={<AnimaisAdocao />} />
              <Route path=":id" element={<AnimalDetails />} />
              <Route path="lista" element={<AnimalList />} />
              <Route path="info" element={<AdocaoInfo />} />
              <Route path="my-adoptions" element={<ClientForms />} />
              <Route
                path="my-form-details/:id"
                element={<FormularioCliente />}
              />
              <Route path="adoption-form/:id" element={<CheckAndAdopt />} />
            </Route>
            <Route path="agendamento" element={<AgendamentoDefault />}>
              <Route index element={<MenuAgenda />} />
              <Route path="new" element={<NovoAgendamento />} />
              <Route
                path="meus-agendamentos"
                element={<AgendamentosCliente />}
              />
            </Route>
          </Route>

          {/* Admin */}
          <Route
            path="admin"
            element={
              getToken() ? <Navigate to="dashboard" /> : <Navigate to="login" />
            }
          />
          <Route path="admin" element={<Dashboard />}>
            <Route
              path="login"
              element={
                getToken() ? (
                  <Navigate to="/admin/dashboard" replace />
                ) : (
                  <Login />
                )
              }
            />
            <Route path="signup" element={<SignUp />} />
            <Route path="dashboard" element={<Navigate to="app" />} />
            <Route
              path="dashboard"
              element={getToken() ? <Drawer /> : <Navigate to="/admin/login" />}
            >
              <Route index path="app" element={<Admin />} />
              {/* Profissionais, serviços e escalas */}
              <Route path="profissionais" element={<Professionals />}>
                <Route index element={<ProfessionalsTable />} />
                <Route path="new/:id?" element={<NovoProfissional />} />
                <Route path="escala" element={<Escala />} />
                <Route path="escala/new/:id?" element={<NovaEscala />} />
                <Route path="servicos" element={<Servicos />} />
              </Route>
              {/* Destaque */}
              <Route path="destaque" element={<Destaque />}>
                <Route index element={<DestaqueTable />} />
                <Route path="new/:id?" element={<DestaqueEditor />} />
              </Route>
              {/* Animais do canil */}
              <Route path="animais" element={<Pets />}>
                <Route index element={<PetsTable />} />
                <Route path="new/:id?" element={<EditAnimal />} />
              </Route>
              {/* Formularios de Adoção */}
              <Route path="adocoes" element={<Adocoes />}>
                <Route index element={<AdocoesTable />} />
                <Route path="new/:id?" element={<NovaAdocao />} />
              </Route>
              {/* Artigos do blog */}
              <Route path="artigos" element={<ArticleList />}>
                <Route index element={<ArticleTable />} />
                <Route path="new/:id?" element={<EditorArticle />} />
              </Route>
              {/* Informações da pagina canil */}
              <Route path="canilInfo" element={<CanilInfo />}>
                <Route index element={<CanilInfoTable />} />
                <Route path="new/:id?" element={<EditorCanil />} />
              </Route>
              {/* Informações da pagina hovet */}
              <Route path="hovetInfo" element={<HovetInfo />}>
                <Route index element={<HovetInfoTable />} />
                <Route path="new/:id?" element={<EditorHovet />} />
              </Route>
              {/* Agendamentos */}
              <Route path="agendamentos" element={<Agendamento />}>
                <Route index element={<AgendamentoTable />} />
                <Route path="new/:id?" element={<EditorAgendamento />} />
              </Route>
              <Route path="perfil" element={<Profile />} />
              {/* <Route path="*" element={<ErrorPage />} /> */}
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
      {/* <div> Foooter </div> */}
    </Router>
  )
}

export default App

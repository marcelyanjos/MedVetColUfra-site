import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  SignUp,
  Login,
  Admin,
  Pets,
  PetsTable,
  Adocoes,
  Profile,
  Professionals,
  ArticleList,
  ArticleTable,
  EditorArticle,
  Drawer,
  CanilInfo,
  CanilInfoTable,
  EditorCanil,
} from "./pages/Dashboard/routes";
import Dashboard from "./pages/Dashboard";
import {
  Header,
  Home,
  Hovet,
  Blog,
  Canil,
  Adocao,
  AnimaisAdocao,
} from "./pages/Default/routes";
import AnimalList from "./pages/Default/Adocao/AnimalList";
import AdocaoInfo from "./pages/Default/Adocao/Info";
import ClientForms from "./pages/Default/Adocao/ClientForms";
import AnimalDetails from "./pages/Default/Adocao/AnimalDetails";
import CheckAndAdopt from "./pages/Default/Adocao/CheckAndAdopt";
import Article from "./pages/Default/Blog/Article";
import AuthProvider from "./CMS/components/AuthProvider/AuthProvider";
import { getToken } from "./CMS/Helpers";
import ModalUser from "./pages/Dashboard/AnimalList/ModalUser";

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
              <Route path="lista" element={<AnimalList />} />
              <Route path="info" element={<AdocaoInfo />} />
              <Route path="my-adoptions" element={<ClientForms />} />
              <Route path=":id" element={<AnimalDetails />} />
              <Route path="adoption-form/:id" element={<CheckAndAdopt />} />
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
              <Route path="profissionais" element={<Professionals />} />
             {/* Animais do canil */}
              <Route path="animais" element={<Pets />}>
                <Route index element={<PetsTable />} />
                <Route path="new/:id?" element={<ModalUser />} />
              </Route>
              {/* Formularios de Adoção */}
              <Route path="adocoes" element={<Adocoes />} />
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
              <Route path="perfil" element={<Profile />} />
              {/* <Route path="*" element={<ErrorPage />} /> */}
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
      {/* <div> Foooter </div> */}
    </Router>
  );
}

export default App;

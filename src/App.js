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
  Profile,
  Professionals,
  Article,
  ArticleTable,
  Editor,
  Drawer,
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
// import ErrorPage from "./Pages/ErrorPage";
import AuthProvider from "./CMS/components/AuthProvider/AuthProvider";
import { getToken } from "./CMS/Helpers";

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
            <Route path="login" element={getToken() ? <Navigate to="/admin/dashboard" replace /> : <Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="dashboard" element={<Navigate to="app" />} />
            <Route path="dashboard" element={getToken() ? <Drawer />:<Navigate to="/admin/login" />}>
              <Route index path="app" element={<Admin />} />
              <Route path="profissionais" element={<Professionals />} />
              <Route path="animais" element={<Pets />} />
              <Route path="artigos" element={<Article />}>
                <Route index element={<ArticleTable />} />
                <Route path="new" element={<Editor />} />
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

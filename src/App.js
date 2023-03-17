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
  Medicine,
  Article,
  ArticleTable,
  Editor,
  Drawer,
} from "./pages/Dashboard/routes";
import Dashboard from "./pages/Dashboard";
import { Header, Home,Institucional, Blog } from "./pages/Default/routes";
// import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="" />} />
        <Route path="/" element={<Header />}>
          <Route index path="" element={<Home />} />
          <Route index path="institucional" element={<Institucional />} />
          <Route index path="blog" element={<Blog />} />
        </Route>
        {/* Admin */}
        <Route path="admin" element={<Navigate to="login" />} />
        <Route path="admin" element={<Dashboard />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="dashboard" element={<Navigate to="app" />} />
          <Route path="dashboard" element={<Drawer />}>
            <Route index path="app" element={<Admin />} />
            <Route path="medicamentos" element={<Medicine />} />
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
      {/* <div> Foooter </div> */}
    </Router>
  );
}

export default App;

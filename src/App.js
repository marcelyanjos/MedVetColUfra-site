import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/SignIn/index";
import SignOut from "./pages/SignOut/index";
import Home from "./pages/home";
import Animais from "./pages/AdoptionList";
import Perfil from "./pages/Profile";
import Medicamentos from "./pages/MedicationList";
import Article from "./pages/Articles";
import ArticleTable from "./pages/Articles/table";
import Editor from "./pages/Articles/editor";
import Drawer from "./Drawer";
// import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="signin" />} />
        <Route path="signIn" element={<SignIn />} />
        <Route path="signOut" element={<SignOut />} />
        <Route path="dashboard" element={<Navigate to="app" />} />
        <Route path="dashboard" element={<Drawer />}>
          <Route index path="app" element={<Home />} />
          <Route path="medicamentos" element={<Medicamentos />} />
          <Route path="animais" element={<Animais />} />
          <Route path="artigos" element={<Article />}>
            <Route index element={<ArticleTable />} />
            <Route path="new" element={<Editor />} />
          </Route>
          <Route path="perfil" element={<Perfil />} />
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Route>
      </Routes>
      {/* <div> Foooter </div> */}
    </Router>
  );
}

export default App;

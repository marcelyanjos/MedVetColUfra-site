import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn/index";
import Home from "./pages/home";
import Animais from "./pages/AdoptionList";
import Medicamentos from "./pages/MedicationList"
import Drawer from './Drawer'
// import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="signin" />} />
        <Route path="signIn" element={<SignIn />} />
        <Route path="dashboard" element={<Navigate to="app" />} />
        <Route path="dashboard" element={<Drawer />} >
        <Route index path="app" element={<Home />} />
        <Route path="medicamentos" element={<Medicamentos />} />
        <Route path="animais" element={<Animais />} />
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Route>
      </Routes>
      {/* <div> Foooter </div> */}
    </Router>
  );
}

export default App;
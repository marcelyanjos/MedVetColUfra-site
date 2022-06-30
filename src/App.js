import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/AdoptionList";
import Profile from "./pages/MedicationList"
import Drawer from './Drawer'
// import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard/app" />} />
        <Route path="dashboard" element={<Drawer />} >
        <Route index path="app" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="about" element={<About />} />
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Route>
      </Routes>
      {/* <div> Foooter </div> */}
    </Router>
  );
}

export default App;
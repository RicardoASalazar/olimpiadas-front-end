import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./components/ReporteUsuarios";
import ReporteComplejos from "./components/ReporteComplejos";
import Sidebar from "./components/Sidebar";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import GestionComplejos from "./components/GestionComplejos";
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/usuarios" element={<Dashboard />} />
            <Route path="/" element={<ReporteComplejos />} />
            <Route path="/gestion" element={<GestionComplejos/>} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

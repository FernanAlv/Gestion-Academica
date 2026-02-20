import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Importamos las páginas
import Login from "./paginas/Login"; // <--- Importamos el Login
import Inicio from "./paginas/Inicio";
import Estudiantes from "./paginas/Estudiantes";
import Materias from "./paginas/Materias";
import Calificaciones from "./paginas/Calificaciones";

function App() {
  // Estado para saber si el usuario está dentro o fuera
  const [usuario, setUsuario] = useState(null);

  // 1. SI NO HAY USUARIO, MOSTRAMOS SOLO EL LOGIN
  if (!usuario) {
    return <Login alIngresar={(nombre) => setUsuario(nombre)} />;
  }

  // 2. SI HAY USUARIO, MOSTRAMOS LA APP COMPLETA
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/estudiantes" element={<div className="container"><Estudiantes /></div>} />
        <Route path="/materias" element={<div className="container"><Materias /></div>} />
        <Route path="/calificaciones" element={<div className="container"><Calificaciones /></div>} />
      </Routes>
    </Router>
  );
}

export default App;
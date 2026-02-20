import React from "react";
import { Link } from "react-router-dom";

function Inicio({ usuario, alSalir }) {
  return (
    <div>
      <header className="portal-header">
        <div>
          <h1>UNIVERSIDAD PROTOTIPO</h1>
          <small style={{ opacity: 0.8 }}>Portal Académico 2026</small>
        </div>
        
        <div className="header-derecha">
          <span className="usuario-info">
            {usuario ? usuario.toUpperCase() : "USUARIO"} | EN LÍNEA 🟢
          </span>
          <button onClick={alSalir} className="btn-logout">
            Cerrar Sesión 🚪
          </button>
        </div>
      </header>

      {/* Sección de Bienvenida */}
      <div className="bienvenida-section">
        <h2>Bienvenido, {usuario}</h2>
        <p className="subtexto">Seleccione el sistema al que desea acceder:</p>
      </div>

      {/* Grid de Botones (Menú Principal) */}
      <div className="dashboard-grid">
        
        {/* Botón 1: Estudiantes */}
        <Link to="/estudiantes" className="menu-card card-azul">
          <span className="icon-grande">👨‍🎓</span>
          <span>Registro de Estudiantes</span>
        </Link>

        {/* Botón 2: Materias */}
        <Link to="/materias" className="menu-card card-verde">
          <span className="icon-grande">📚</span>
          <span>Gestión de Materias</span>
        </Link>

        {/* Botón 3: Calificaciones */}
        <Link to="/calificaciones" className="menu-card card-azul">
          <span className="icon-grande">📝</span>
          <span>Ingreso de Notas</span>
        </Link>

        {/* Configuración Inactivo */}
        <div className="menu-card card-gris">
          <span className="icon-grande">⚙️</span>
          <span>Configuración</span>
        </div>

      </div>
    </div>
  );
}

export default Inicio;
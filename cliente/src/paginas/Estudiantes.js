import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [form, setForm] = useState({ nombre: "", email: "" });

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  const cargarEstudiantes = async () => {
    const res = await fetch("http://localhost:3000/estudiantes");
    setEstudiantes(await res.json());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/estudiantes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ nombre: "", email: "" });
    cargarEstudiantes();
    alert("Estudiante registrado");
  };

  return (
    <div>
      <div className="btn-volver-container">
        <Link to="/" className="btn-volver">⬅ Volver al Menú</Link>
      </div>

      <h2 className="titulo-pagina">Gestión de Estudiantes</h2>
      
      <div className="card">
        <h3>Nuevo Registro</h3>
        <form onSubmit={handleSubmit}>
          <label>Nombre Completo:</label>
          <input
            value={form.nombre}
            onChange={(e) => setForm({...form, nombre: e.target.value})}
          />
          <label>Email Institucional:</label>
          <input
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
          />
          <button type="submit">Guardar Estudiante</button>
        </form>
      </div>

      <div className="lista">
        <h3>Estudiantes Registrados</h3>
        <table>
          <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map(est => (
                <tr key={est.id}>
                    <td>{est.id}</td>
                    <td>{est.nombre}</td>
                    <td>{est.email}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Estudiantes;
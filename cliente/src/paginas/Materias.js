import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Materias() {
  const [materias, setMaterias] = useState([]);
  const [form, setForm] = useState({ nombre: "", creditos: "" });

  useEffect(() => {
    cargarMaterias();
  }, []);

  const cargarMaterias = async () => {
    const res = await fetch("http://localhost:3000/materias");
    setMaterias(await res.json());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/materias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ nombre: "", creditos: "" });
    cargarMaterias();
    alert("Materia creada");
  };

  return (
    <div>
      <div className="btn-volver-container">
        <Link to="/" className="btn-volver">⬅ Volver al Menú</Link>
      </div>

      <h2 className="titulo-pagina">Catálogo de Materias</h2>

      <div className="card">
        <h3>Crear Materia</h3>
        <form onSubmit={handleSubmit}>
          <label>Nombre de la Materia:</label>
          <input
            value={form.nombre}
            onChange={(e) => setForm({...form, nombre: e.target.value})}
            required
            placeholder="Ej. Programación I"
          />
          <label>Créditos (UV):</label>
          <input
            type="number"
            value={form.creditos}
            onChange={(e) => setForm({...form, creditos: e.target.value})}
            required
            placeholder="Ej. 4"
          />
          <button type="submit" style={{backgroundColor: "#198754"}}>Crear Materia</button>
        </form>
      </div>

      <div className="lista">
        <h3>Materias Disponibles</h3>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Créditos</th>
                </tr>
            </thead>
            <tbody>
                {materias.map(mat => (
                    <tr key={mat.id}>
                        <td>{mat.nombre}</td>
                        <td>{mat.creditos} UV</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}

export default Materias;
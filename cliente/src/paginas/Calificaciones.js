import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Calificaciones() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [calificaciones, setCalificaciones] = useState([]);
  const [form, setForm] = useState({ estudiante_id: "", materia_id: "", nota: "" });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const resEst = await fetch("http://localhost:3000/estudiantes");
    const resMat = await fetch("http://localhost:3000/materias");
    const resCalif = await fetch("http://localhost:3000/calificaciones");
    setEstudiantes(await resEst.json());
    setMaterias(await resMat.json());
    setCalificaciones(await resCalif.json());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/calificaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ estudiante_id: "", materia_id: "", nota: "" });
    cargarDatos();
    alert("Nota guardada");
  };

  return (
    <div>
      <div className="btn-volver-container">
        <Link to="/" className="btn-volver">⬅ Volver al Menú</Link>
      </div>

      <h2 className="titulo-pagina">Registro de Calificaciones</h2>

      <div className="card">
        <h3>Asignar Nota</h3>
        <form onSubmit={handleSubmit}>
          <label>Estudiante:</label>
          <select 
            value={form.estudiante_id}
            onChange={(e) => setForm({...form, estudiante_id: e.target.value})}
            required
          >
            <option value="">-- Seleccionar Estudiante --</option>
            {estudiantes.map(est => <option key={est.id} value={est.id}>{est.nombre}</option>)}
          </select>

          <label>Materia:</label>
          <select 
            value={form.materia_id}
            onChange={(e) => setForm({...form, materia_id: e.target.value})}
            required
          >
            <option value="">-- Seleccionar Materia --</option>
            {materias.map(mat => <option key={mat.id} value={mat.id}>{mat.nombre}</option>)}
          </select>

          <label>Nota Final (0-100):</label>
          <input
            type="number"
            value={form.nota}
            onChange={(e) => setForm({...form, nota: e.target.value})}
            min="0" max="100" required
          />
          <button type="submit">Guardar Nota</button>
        </form>
      </div>

      <div className="lista">
        <h3>Historial Académico Completo</h3>
        <table>
          <thead>
            <tr><th>Estudiante</th><th>Materia</th><th>Nota</th><th>Fecha</th></tr>
          </thead>
          <tbody>
            {calificaciones.map((cal) => (
              <tr key={cal.id}>
                <td>{cal.estudiante}</td>
                <td>{cal.materia}</td>
                <td><strong>{cal.nota}</strong></td>
                <td>{cal.fecha_evaluacion.split("T")[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Calificaciones;
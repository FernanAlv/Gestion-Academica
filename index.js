const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); 

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'PrototipoGestion',
  password: 'fernan1423', 
  port: 5432,
});

app.get('/', (req, res) => {
  res.send('¡Servidor del Sistema Escolar funcionando! 🚀');
});

app.post('/login', async (req, res) => {
  console.log("📢 INTENTO DE LOGIN RECIBIDO");
  try {
    const { username, password } = req.body;
    
    const resultado = await pool.query(
      "SELECT * FROM usuarios WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (resultado.rows.length > 0) {
      console.log("✅ Acceso CONCEDIDO a:", resultado.rows[0].username);
      res.json({ exito: true, usuario: resultado.rows[0].username });
    } else {
      console.log("❌ Acceso DENEGADO");
      res.status(401).json({ exito: false, mensaje: "Credenciales incorrectas" });
    }
  } catch (err) {
    console.error("💥 Error en login:", err.message);
    res.status(500).send("Error del servidor");
  }
});

app.post('/estudiantes', async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const nuevo = await pool.query(
      "INSERT INTO estudiantes (nombre, email) VALUES ($1, $2) RETURNING *",
      [nombre, email]
    );
    res.json(nuevo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error al guardar estudiante");
  }
});

app.get('/estudiantes', async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM estudiantes ORDER BY id ASC");
    res.json(todos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error al obtener estudiantes");
  }
});

app.post('/materias', async (req, res) => {
  try {
    const { nombre, creditos } = req.body;
    const nueva = await pool.query(
      "INSERT INTO materias (nombre, creditos) VALUES ($1, $2) RETURNING *",
      [nombre, creditos]
    );
    res.json(nueva.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error al crear materia");
  }
});

app.get('/materias', async (req, res) => {
  try {
    const todas = await pool.query("SELECT * FROM materias ORDER BY id ASC");
    res.json(todas.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error al obtener materias");
  }
});

app.post('/calificaciones', async (req, res) => {
  try {
    const { estudiante_id, materia_id, nota } = req.body;
    const nueva = await pool.query(
      "INSERT INTO calificaciones (estudiante_id, materia_id, nota) VALUES ($1, $2, $3) RETURNING *",
      [estudiante_id, materia_id, nota]
    );
    res.json(nueva.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error al registrar nota");
  }
});

app.get('/calificaciones', async (req, res) => {
  try {
    const query = `
      SELECT c.id, e.nombre AS estudiante, m.nombre AS materia, c.nota, c.fecha_evaluacion 
      FROM calificaciones c
      JOIN estudiantes e ON c.estudiante_id = e.id
      JOIN materias m ON c.materia_id = m.id
      ORDER BY c.fecha_evaluacion DESC;
    `;
    const notas = await pool.query(query);
    res.json(notas.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error al obtener notas");
  }
});

app.listen(3000, () => {
  console.log('✅ El servidor está corriendo en el puerto 3000');
});
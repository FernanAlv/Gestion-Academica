import React, { useState } from "react";

function Login({ alIngresar }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usuario, password: password }),
      });

      const data = await response.json();

      if (data.exito) {
        alIngresar(data.usuario);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Error de conexión", err);
      setError(true);
    }
  };

  return (
    <div className="login-fondo">
      <div className="login-tarjeta">
        <h2 className="login-titulo">¡Bienvenido de nuevo!</h2>
        <p className="login-subtitulo">
          Por favor, ingresa tus credenciales para acceder al sistema académico.
        </p>
        
        <form onSubmit={handleLogin}>
          <div className="login-input-container">
            <input 
                type="text" 
                placeholder="Nombre de usuario" 
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="login-input"
                required
            />
          </div>
          
          <div className="login-input-container">
            <input 
                type="password" 
                placeholder="Contraseña" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                required
            />
          </div>

          <div className="login-options-row">
            <label className="login-checkbox-container">
                <input type="checkbox" /> Recordarme
            </label>
            <span className="login-link-olvido">¿Olvidaste tu contraseña?</span>
          </div>
          
          <button type="submit" className="login-btn">
            Iniciar Sesión
          </button>
        </form>

        {error && (
          <div className="login-error">
            ⚠ Usuario o contraseña incorrectos
          </div>
        )}
        
        <div className="login-signup-link">
          ¿No tienes una cuenta? <strong>Regístrate aquí</strong>
        </div>
      </div>
    </div>
  );
}

export default Login;
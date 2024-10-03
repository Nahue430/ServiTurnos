import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';





const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('cliente');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  


  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!username.trim() || !password.trim() || !email.trim()) {
      setError('Todos los campos son obligatorios y no pueden contener solo espacios.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Convertir a mayúsculas
    const upperCaseUsername = username.toUpperCase();
    const upperCaseEmail = email.toUpperCase();
    const upperCasePassword = password.toUpperCase();

    // Aquí puedes manejar el registro (enviar a la API, etc.)
    console.log({ upperCaseUsername, upperCasePassword, upperCaseEmail, userType });
  };

  const handleBack =()=> {
    navigate('/');
  };

  return (
    <div>
      <h1>Crea tu cuenta</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Ingrese un nombre de usuario:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Ingrese una contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Repita la contraseña ingresada:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Ingrese su email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Seleccione tipo de usuario:
            <select value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value="cliente">Cliente</option>
              <option value="profesional">Profesional</option>
            </select>
          </label>
        </div>

        <button type="submit">Registrarse</button>
      </form>
      <button onClick={handleBack}>Volver</button>
    </div>
  );
};

export default Register;
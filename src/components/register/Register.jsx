import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import './Register.css';

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

    // Validación de campos
    if (!username.trim() || !password.trim() || !email.trim()) {
      setError('Todos los campos son obligatorios y no pueden contener solo espacios.');
      return;
    }

    if (username.length < 5 || username.length > 15) {
      setError('El nombre de usuario debe tener entre 5 y 15 caracteres.');
      return;
    }

    if (/\s/.test(username)) {
      setError('El nombre de usuario no puede contener espacios.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden. Por favor, ingréselas nuevamente.');
      return;
    }

    if (userType === 'profesional') {
      // Si el tipo de usuario es "profesional", mostrar un alert y redirigir
      alert('¡Perfecto! Solo necesitamos algunos datos más.');
      navigate('/registerPro');  // Redirigir al siguiente componente de registro profesional
      return;
    }

    if (userType === 'cliente') {
      // Si el tipo de usuario es "cliente", crear cuenta y redirigir a página principal
      alert('¡Cuenta creada con éxito!');
      navigate('/homeClient'); // Redirigir a la página principal
      return;
    }

    // Si es cliente, puedes procesar la información o redirigir a donde necesites
    console.log({ username, email, userType });
  };

  const handleBack = () => {
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

        {error && <p style={{ color: 'red' }}>{error}</p>} 
        <Row style={{padding: '10px'}}>
          <Col md="7">
        <Button type="submit"  variant="primary" className="ms-2">Registrarse</Button>
        </Col>
        <Col md="5">
        <Button type="button" variant="secondary" onClick={handleBack} className="ms-2">Volver</Button>
        </Col>
        </Row>
      </form>
      
    
          
    </div>
  );
};

export default Register;
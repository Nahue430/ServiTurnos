import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/');
    };
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="user">Usuario:</Form.Label>
        <Form.Control type="text" id="user" />
        <Form.Label htmlFor="password">Contraseña:</Form.Label>
        <Form.Control type="password" id="password" />
      </Form.Group>

      <Button variant="primary">Ingresar</Button>{' '}
      
      <button onClick={handleBack}>Volver</button>
    </>
    
  );
};

export default Login;
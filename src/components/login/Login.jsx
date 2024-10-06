import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    const handleForgotPassword = () => {
        navigate('/reset-password'); 
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

            <Button type="button" variant="secondary" onClick={handleBack} className="ms-2">
                Volver
            </Button>

            <div className="mt-3">
                {/* Frase "¿Olvidó su contraseña?" con funcionalidad */}
                <span
                    style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={handleForgotPassword}
                >
                    ¿Olvidó su contraseña?
                </span>
            </div>
        </>
    );
};

export default Login;

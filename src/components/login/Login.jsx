import React, { useState, useContext } from 'react';
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../context/authenticationContext/AuthenticationContext';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { LoginUser } = useContext(AuthenticationContext);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleBack = () => {
        navigate('/');
    };

    const handleForgotPassword = () => {
        navigate('/reset-password');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !password) {
            setError('Por favor, ingrese su usuario y contraseña.');
            return;
        }

        const userRequest = {
            username: user,
            password: password,
        };

        try {
            const decodedToken = await LoginUser(userRequest);
            
            if (decodedToken !== null) {
                if (decodedToken.TypeCustomer === "Customer") {
                    navigate("/clientSearch", { replace: true });
                } else if (decodedToken.TypeCustomer === "Professional") {
                    navigate("/homeProfessional", { replace: true });
                } else if (decodedToken.TypeCustomer === "SuperAdmin") {
                    navigate("/homeAdmin", { replace: true });
            }} else {
                setError("Error en el inicio de sesión. Por favor, revise sus credenciales.");
            }
        } catch (error) {
            console.error("Error en la autenticación:", error);
            setError("Ocurrió un error al intentar iniciar sesión. Intente nuevamente.");
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>   
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="user">Usuario:</Form.Label>
                    <Form.Control
                        type="text"
                        id="user"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                        className="custom-input"
                    />

                    <Form.Label htmlFor="password">Contraseña:</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="custom-input"
                    />
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}
                <Row style={{ padding: '10px' }}>
                    <Col>
                        <Button variant="primary" type="submit">Ingresar</Button>{' '}
                    </Col>
                    <Col>
                        <Button type="button" variant="secondary" onClick={handleBack} className="ms-2">Volver</Button>
                    </Col>
                </Row>
                <div className="mt-3">
                    <span
                        style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={handleForgotPassword}
                    >
                        ¿Olvidó su contraseña?
                    </span>
                </div>
            </Form>
        </>
    );
};

export default Login;

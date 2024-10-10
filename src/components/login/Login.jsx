import React, { useState } from 'react';
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    
    
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleBack = () => {
        navigate('/');
    };

    const handleForgotPassword = () => {
        navigate('/reset-password'); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        
        if (!user || !password) {
            setError('Por favor, ingrese su usuario y contraseña.');
        } else {
            
            console.log('Usuario:', user);
            console.log('Contraseña:', password);
            setError('');  
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
                    />

                    <Form.Label htmlFor="password">Contraseña:</Form.Label>
                    <Form.Control 
                        type="password" 
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </Form.Group>

                
                {error && <Alert variant="danger">{error}</Alert>}
                <Row style={{padding: '10px'}}>
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
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/Login');
    };

    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Aquí iría la lógica para enviar el mail de recuperación o consultar si esto se hace en el backend

        console.log(`Se envió un correo a: ${email}`);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h3>Recuperar contraseña</h3>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="email">Ingrese su correo electrónico:</Form.Label>
                <Form.Control
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Enviar correo de recuperación
            </Button>

            
            <Button type="button" variant="secondary" onClick={handleBack} className="ms-2">
                Volver
            </Button>
        </Form>
    );
};

export default ResetPassword;


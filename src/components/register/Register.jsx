import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import './Register.css';
import { AuthenticationContext } from '../../context/authenticationContext/AuthenticationContext';

const Register = () => {
  const { CreateCustomer } = useContext(AuthenticationContext);
  const { CreateProfessional } = useContext(AuthenticationContext);  

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('cliente');
  const [error, setError] = useState('');
  const [tarifaBase, setTarifaBase] = useState('');
  const [rubro, setRubro] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim() || !email.trim() || !firstName.trim() || !lastName.trim() || !dni.trim()) {
      setError('Todos los campos son obligatorios y no pueden contener solo espacios.');
      return;
    }

    if (username.length < 5 || username.length > 25) {
      setError('El nombre de usuario debe tener entre 5 y 15 caracteres.');
      return;
    }

    if (dni.length < 6 || dni.length > 9) {
      setError('Ingrese un dni valido.');
      return;
    }

    if (/\s/.test(username)) {
      setError('El nombre de usuario no puede contener espacios.');
      return;
    }

    if (userType === 'cliente') {

      const customerRequest = {
        username,
        password,
        firstName,
        lastName,
        dni,
        email,
        phone,
        address
      };


      const response = await CreateCustomer(customerRequest);
      console.log(response);
      alert('Cliente registrado con exito');
    }

    if (userType === 'profesional') {

      const professionalRequest = {
        username,
        password,
        firstName,
        lastName,
        dni,
        email,
        phone,
        address,
        fee: Number(tarifaBase),
        profession: rubro,
      };


      const response = await CreateProfessional(professionalRequest);
      console.log(response);
      alert('Profesonal registrado con exito');
    }

    navigate('/login');
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
            Ingrese su nombre:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Ingrese su apellido:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Ingrese su dni:
            <input
              type="number"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
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
            Ingrese su telefono:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Ingrese su domicilio:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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

        {userType === 'profesional' && (
          <>
            <div>
              <label>Selecciona tu rubro:
                <select value={rubro} onChange={(e) => setRubro(Number(e.target.value))} required>
                  <option value="" disabled>Seleccione...</option>
                  <option value="0">Gasista</option>
                  <option value="1">Electricista</option>
                  <option value="2">Plomero</option>
                  <option value="3">Carpintero</option>
                  <option value="4">Albañil</option>
                  <option value="5">Refrigeracion</option>
                </select>
              </label>
            </div>

            <div>
              <label>Ingrese su tarifa base:
                <input type="number" value={tarifaBase} onChange={(e) => setTarifaBase(e.target.value)} max="99999" required />
              </label>
            </div>
          </>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Row style={{ padding: '10px' }}>
          <Col md="7">
            <Button type="submit" variant="primary" className="ms-2">Registrarse</Button>
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
import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthenticationContext } from '../../context/authenticationContext/AuthenticationContext';
import "./HomeProfessional.css";

const HomeProfessional = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [tarifa, setTarifa] = useState('');
  const [foto, setFoto] = useState(null);
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [profession, setProfession] = useState('');
  const [editMode, setEditMode] = useState(false);

  const { user, getProfessionalById } = useContext(AuthenticationContext);

  useEffect(() => {
    const fetchProfessional = async () => {
      if (user) {
        const decodedToken = JSON.parse(atob(user.split('.')[1]));
        const professionalId = decodedToken.Id;

        const professionalData = await getProfessionalById(professionalId);
        if (professionalData) {
          setUsername(professionalData.userName);
          setFirstName(professionalData.firstName);
          setLastName(professionalData.lastName);
          setEmail(professionalData.email);
          setTarifa(professionalData.fee);
          setDni(professionalData.dni);
          setPassword(professionalData.password);

          const professionMapping = [
            'Gasista', 
            'Electricista', 
            'Plomero', 
            'Carpintero', 
            'Albañil', 
            'Refrigeracion'
          ];

          let professionValue = professionalData.profession;
          if (typeof professionValue === "number" && professionValue >= 0 && professionValue < professionMapping.length) {
            setProfession(professionMapping[professionValue]);
          } else {
            console.error('Valor de profesión inválido:', professionValue);
            setProfession('Desconocida');
          }
        }
      }
    };

    fetchProfessional();
  }, [user, getProfessionalById]);

  const handleFotoChange = (e) => {
    setFoto(URL.createObjectURL(e.target.files[0]));
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    setEditMode(false);
    // Aquí podrías enviar los datos actualizados a tu backend o guardarlos en localStorage
  };

  return (
    <div className="perfil-container">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="w-100" style={{marginTop:"75.5px"}}>
        <Nav className="w-100 justify-content-between">
          <Nav.Link as={Link} to="/homeProfessional" className="mx-3">Perfil</Nav.Link>
          <Nav.Link as={Link} to="/reservas" className="mx-3">Reservas</Nav.Link>
          <Nav.Link as={Link} to="/" className="mx-3">Salir</Nav.Link>
        </Nav>
      </Navbar>

      <h1>Perfil</h1>
      <Row className="perfil-row">
        <Col md={4}>
          <div className="foto-container">
            {foto ? (
              <img src={foto} alt="Foto de perfil" className="foto-perfil" />
            ) : (
              <img src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg" alt="foto-genérica" className="foto-generica" />
            )}
            <Form.Group controlId="formFile" className="mt-2">
              <Form.Label className="colorLabelPhoto">Cambiar foto de perfil</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFotoChange}
              />
            </Form.Group>
          </div>
        </Col>

        <Col md={8}>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">Username:</Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  value={username}
                  readOnly={!editMode}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">Nombre:</Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  value={firstName}
                  readOnly={!editMode}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">Apellido:</Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  value={lastName}
                  readOnly={!editMode}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">Email:</Form.Label>
              <Col sm="8">
                <Form.Control
                  type="email"
                  value={email}
                  readOnly={!editMode}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">Tarifa:</Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  value={tarifa}
                  readOnly={!editMode}
                  onChange={(e) => setTarifa(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">DNI:</Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  value={dni}
                  readOnly={!editMode}
                  onChange={(e) => setDni(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">Contraseña:</Form.Label>
              <Col sm="8">
                <Form.Control
                  type="password"
                  value={password}
                  readOnly={!editMode}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">Profesión:</Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  value={profession}
                  readOnly={!editMode}
                  onChange={(e) => setProfession(e.target.value)}
                />
              </Col>
            </Form.Group>

            <div className="text-right">
              {editMode ? (
                <Button variant="primary" onClick={handleSave}>
                  Guardar Cambios
                </Button>
              ) : (
                <Button variant="secondary" onClick={toggleEditMode}>
                  Editar Perfil
                </Button>
              )}
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default HomeProfessional;

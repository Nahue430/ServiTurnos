import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
//import './Perfil.css'; // Aquí agregarías los estilos personalizados.

const HomeProfessional = () => {
  const [username, setUsername] = useState('');
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [email, setEmail] = useState('');
  const [rubro, setRubro] = useState('');
  const [horarios, setHorarios] = useState('');
  const [foto, setFoto] = useState(null);
  const [editMode, setEditMode] = useState(false);

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
      <h1>Perfil</h1>
      <Row className="perfil-row">
        <Col md={4}>
          <div className="foto-container">
            {foto ? (
              <img src={foto} alt="Foto de perfil" className="foto-perfil" />
            ) : (
              <div className="foto-placeholder">FOTO</div>
            )}
            <Form.Group controlId="formFile" className="mt-2">
              <Form.Label>Cambiar Foto de Perfil</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFotoChange} />
            </Form.Group>
          </div>
        </Col>

        <Col md={8}>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Username:
              </Form.Label>
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
              <Form.Label column sm="4">
                Nombre:
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  value={nombre}
                  readOnly={!editMode}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Ubicación:
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  value={ubicacion}
                  readOnly={!editMode}
                  onChange={(e) => setUbicacion(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Email:
              </Form.Label>
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
              <Form.Label column sm="4">
                Rubro:
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  value={rubro}
                  readOnly={!editMode}
                  onChange={(e) => setRubro(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Horarios:
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  value={horarios}
                  readOnly={!editMode}
                  onChange={(e) => setHorarios(e.target.value)}
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

export default HomeProfessional;
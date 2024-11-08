import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Col, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthenticationContext } from '../../context/authenticationContext/AuthenticationContext';

const HomeClient = () => {
  const { getCustomerById, user, updateCustomer } = useContext(AuthenticationContext);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");  // Ahora separo primero el nombre
  const [lastName, setLastName] = useState("");    // Aquí para el apellido
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (user) {
      const decodedToken = JSON.parse(atob(user.split('.')[1])); // Decodificamos el token JWT
      const customerId = decodedToken.Id;

      const fetchCustomerData = async () => {
        const customerData = await getCustomerById(customerId);
        if (customerData) {
          setUsername(customerData.userName);
          setFirstName(customerData.firstName);  // Asigno el primer nombre
          setLastName(customerData.lastName);    // Asigno el apellido
          setEmail(customerData.email);
          setPassword(customerData.password || "");
        }
      };

      fetchCustomerData();
    }
  }, [user, getCustomerById]);

  const handleFotoChange = (e) => {
    setFoto(URL.createObjectURL(e.target.files[0]));
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    const decodedToken = JSON.parse(atob(user.split('.')[1])); // Decodificamos el token JWT
    const customerId = decodedToken.Id;

    const updatedCustomerData = {
      userName: username,
      password: password,
      firstName: firstName,  // Utilizo el estado de firstName
      lastName: lastName,    // Utilizo el estado de lastName
      email: email,
      // No agregamos la foto de perfil aquí, ya que no está en la API. Podrías hacer un PUT adicional si es necesario.
    };

    const response = await updateCustomer(customerId, updatedCustomerData);

    if (response) {
      setEditMode(false); // Desactivar el modo de edición
    }
  };

  return (
    <div className="perfil-container">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="w-100" style={{ marginTop: "75.5px" }}>
        <Nav className="w-100 justify-content-between">
          <Nav.Link as={Link} to="/homeClient" className="mx-3">Perfil</Nav.Link>
          <Nav.Link as={Link} to="/clientSearch" className="mx-3">Buscar</Nav.Link>
          <Nav.Link as={Link} to="/reservas" className="mx-3">Reservas</Nav.Link>
          <Nav.Link as={Link} to="/" className="mx-3">Salir</Nav.Link>
        </Nav>
      </Navbar>

      <h1>Perfil</h1>
      <Row className="perfil-row">
        <Col md={6}>
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

        <Col md={6}>
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

            <div className="text-right">
              {editMode ? (
                <Button variant="primary" onClick={handleSave}>Guardar Cambios</Button>
              ) : (
                <Button variant="secondary" onClick={toggleEditMode}>Editar Perfil</Button>
              )}
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default HomeClient;

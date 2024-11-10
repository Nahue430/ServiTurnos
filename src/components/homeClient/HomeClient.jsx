import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Col, Navbar, Nav, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthenticationContext } from '../../context/authenticationContext/AuthenticationContext';

const HomeClient = () => {
  const { getCustomerById, user, updateCustomer, deleteCustomer } = useContext(AuthenticationContext);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (user) {
      const decodedToken = JSON.parse(atob(user.split('.')[1]));
      const customerId = decodedToken.Id;

      const fetchCustomerData = async () => {
        const customerData = await getCustomerById(customerId);
        if (customerData) {
          setUsername(customerData.userName);
          setFirstName(customerData.firstName);
          setLastName(customerData.lastName);
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
    const decodedToken = JSON.parse(atob(user.split('.')[1]));
    const customerId = decodedToken.Id;

    const updatedCustomerData = {
      userName: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    const response = await updateCustomer(customerId, updatedCustomerData);

    if (response) {
      setEditMode(false);
    }
  };

  const handleDelete = async () => {
    const decodedToken = JSON.parse(atob(user.split('.')[1]));
    const customerId = decodedToken.Id;

    const response = await deleteCustomer(customerId);

    if (response) {
      // Redirigir o cerrar sesión tras eliminar la cuenta
      window.location.href = "/";
    }
  };

  return (
    <div className="perfil-container">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="w-100" style={{ marginTop: "75.5px" }}>
        <Nav className="w-100 justify-content-between">
          <Nav.Link as={Link} to="/homeClient" className="mx-3">Perfil</Nav.Link>
          <Nav.Link as={Link} to="/clientSearch" className="mx-3">Buscar</Nav.Link>
          <Nav.Link as={Link} to="/reservasClient" className="mx-3">Reservas</Nav.Link>
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
                <Button variant="primary" onClick={handleSave} className="mr-2">Guardar Cambios</Button>
              ) : (
                <Button variant="secondary" onClick={toggleEditMode} className="mr-2">Editar Perfil</Button>
              )}
              <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Eliminar Cuenta</Button>
            </div>
          </Form>
        </Col>
      </Row>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar Cuenta</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HomeClient;

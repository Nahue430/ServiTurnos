import React, { useState } from "react";
import { Form, Button, Row, Col, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importamos Link para navegación

const ClientSearch = () => {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [rubro, setRubro] = useState("");
  const [horario, setHorario] = useState("");

  const handleSearch = () => {
    // Aquí podrías manejar la lógica para realizar la búsqueda según los filtros seleccionados.
    console.log("Buscando con los siguientes filtros:", {
      nombre,
      ubicacion,
      rubro,
      horario,
    });
  };

  return (
    <div className="buscar-container">
      <Navbar bg="dark" variant="dark">
        <Nav className="w-100 justify-content-between">
          <Nav.Link as={Link} to="/homeClient" className="mx-3">Perfil</Nav.Link>
          <Nav.Link as={Link} to="/clientSearch" className="mx-3">Buscar</Nav.Link>
          <Nav.Link as={Link} to="/reservas" className="mx-3">Reservas</Nav.Link>
          <Nav.Link as={Link} to="/" className="mx-3">Salir</Nav.Link>
        </Nav>
      </Navbar>

      <h1>Buscar</h1>
      <Row className="buscar-row">
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Col lg="6">
              <Form.Label column sm="4">Nombre:</Form.Label>
            </Col>
            <Col lg="6">
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Col>
          </Form.Group>


          <Form.Group as={Row} className="mb-3">
            <Col lg="6">
              <Form.Label column sm="4">Ubicación:</Form.Label>
            </Col>
            <Col lg="6">
              <Form.Control
                type="text"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col lg="6">
              <Form.Label column sm="4">Rubro:</Form.Label>
            </Col>
            <Col lg="6">
              <Form.Control
                as="select"
                value={rubro}
                onChange={(e) => setRubro(e.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="Rubro1">Rubro 1</option>
                <option value="Rubro2">Rubro 2</option>
                <option value="Rubro3">Rubro 3</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col lg="6">
              <Form.Label column sm="4">Horario:</Form.Label>
            </Col>
            <Col lg="6">
              <Form.Control
                as="select"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
                <option value="Noche">Noche</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" onClick={handleSearch}>
              Confirmar
            </Button>
          </div>
        </Form>
      </Row>
    </div>
  );
};

export default ClientSearch;
import React, { useState, useContext } from "react";
import { Form, Button, Row, Col, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthenticationContext } from '../../context/authenticationContext/AuthenticationContext';
import "./ClientSearch.css";

const ClientSearch = () => {
  const [professionals, setProfessionals] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const { getProfessionalByProfession } = useContext(AuthenticationContext);

  const fetchProfessionals = async (profession) => {
    if (profession) {
      const data = await getProfessionalByProfession(profession);
      setProfessionals(data || []);
      setShowForm(false);
    } else {
      setProfessionals([]);
      setShowForm(true);
    }
  };

  const handleResetSearch = () => {
    setShowForm(true);
    setProfessionals([]);
  };

  // Función para ordenar por precio descendente
  const handleSortByPrice = () => {
    const sortedProfessionals = [...professionals].sort((a, b) => b.fee - a.fee);
    setProfessionals(sortedProfessionals);
  };
  // Función para ordenar por precio ascendente
  const handleSortByPriceAsc = () => {
    const sortedProfessionals = [...professionals].sort((a, b) => a.fee - b.fee);
    setProfessionals(sortedProfessionals);
  };

  return (
    <div className="buscar-container">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="w-100" style={{ marginTop: "75.5px" }}>
        <Nav className="w-100 justify-content-between">
          <Nav.Link as={Link} to="/homeClient" className="mx-3">Perfil</Nav.Link>
          <Nav.Link as={Link} to="/clientSearch" className="mx-3">Buscar</Nav.Link>
          <Nav.Link as={Link} to="/reservasClient" className="mx-3">Reservas</Nav.Link>
          <Nav.Link as={Link} to="/" className="mx-3">Salir</Nav.Link>
        </Nav>
      </Navbar>

      {showForm && <h1>Seleccione el profesional que desea contratar:</h1>}

      {showForm && (

        <Form>
          <Form.Group as={Row} className="centered-form">
            <Row className="buscar-row">
              <Col lg="1">
                <Form.Label column sm="4">Profesión:</Form.Label>
              </Col>
              <Col lg="6">
                <Form.Control
                  as="select"
                  onChange={(e) => fetchProfessionals(e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  <option value="0">Gasista</option>
                  <option value="1">Electricista</option>
                  <option value="2">Plomero</option>
                  <option value="3">Carpintero</option>
                  <option value="4">Albañil</option>
                  <option value="5">Refrigeración</option>
                </Form.Control>
              </Col>
            </Row>
          </Form.Group>
        </Form>

      )}

      {Array.isArray(professionals) && professionals.length > 0 && (
        <div>
          <h2>Profesionales Encontrados:</h2>
          <div className="button-container text-center">
            <Button variant="secondary" onClick={handleResetSearch}>
              Buscar otro profesional
            </Button>

            <Button variant="primary" onClick={handleSortByPrice} style={{ marginLeft: '10px' }}>
              Precio mas caro
            </Button>
            <Button variant="primary" onClick={handleSortByPriceAsc} style={{ marginLeft: '10px' }}>
              Precio mas barato
            </Button>
          </div>
          <ul className="professional-list">
            {professionals.map((professional) => (
              <li key={professional.id} className="professional-item">
                <Row style={{ width: "70rem" }}>
                  <Col md="3"><div><strong>Nombre:</strong> {professional.firstName} {professional.lastName}</div></Col>
                  <Col md="3"><div><strong>Costo:</strong> {professional.fee}</div></Col>
                  <Col md="3"><div><strong>Teléfono:</strong> {professional.phone}</div></Col>
                  <Col md="3"><div><strong>Dirección:</strong> {professional.address}</div></Col>
                </Row>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClientSearch;
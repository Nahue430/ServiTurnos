import React, { useState, useContext } from "react";
import { Form, Button, Row, Col, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthenticationContext } from '../../context/authenticationContext/AuthenticationContext';
import "./ClientSearch.css";

const ClientSearch = () => {
  const [professionals, setProfessionals] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [showForm, setShowForm] = useState(true);

  const { user, getProfessionalByProfession, createMeeting } = useContext(AuthenticationContext);

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

  const handleProfessionalSelect = (professional) => {
    setSelectedProfessional(professional);
  };

  const handleCreateMeeting = async () => {
    const decodedToken = JSON.parse(atob(user.split('.')[1]));
    const customerId = decodedToken.Id;

    if (customerId && selectedProfessional && meetingDate && meetingTime) {
      const combinedDateTimeString = `${meetingDate}T${meetingTime}:00.000Z`;
      const combinedDateTime = new Date(combinedDateTimeString);

      if (isNaN(combinedDateTime)) {
        alert("La fecha y hora seleccionadas no son válidas.");
        return;
      }

      await createMeeting({
        customerId,
        professionalId: selectedProfessional.id,
        dateTime: combinedDateTime.toISOString()
      });
      alert("Reunión creada exitosamente");
    } else {
      alert("Por favor, completa todos los campos.");
    }
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

  // Función para limpiar la lista y mostrar el formulario de búsqueda
  const handleSearchAnotherProfessional = () => {
    setProfessionals([]); // Limpia la lista de profesionales
    setShowForm(true); // Muestra el formulario de búsqueda
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
                <Form.Control as="select" onChange={(e) => fetchProfessionals(e.target.value)}>
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
            <Button variant="secondary" onClick={handleSearchAnotherProfessional}>Buscar otro profesional</Button>
            <Button variant="primary" onClick={handleSortByPrice} style={{ marginLeft: '10px' }}>
              Precio más caro
            </Button>
            <Button variant="primary" onClick={handleSortByPriceAsc} style={{ marginLeft: '10px' }}>
              Precio más barato
            </Button>
          </div>

          <ul className="professional-list">
            {professionals.map((professional) => (
              <li key={professional.id} className="professional-item" onClick={() => handleProfessionalSelect(professional)}>
                <Row style={{ width: "70rem" }}>
                  <Col md="3"><div><strong>Nombre:</strong> {professional.firstName} {professional.lastName}</div></Col>
                  <Col md="3"><div><strong>Costo:</strong> {professional.fee}</div></Col>
                  <Col md="3"><div><strong>Teléfono:</strong> {professional.phone}</div></Col>
                  <Col md="3"><div><strong>Dirección:</strong> {professional.address}</div></Col>
                </Row>
              </li>
            ))}
          </ul>

          {selectedProfessional && (
            <div>
              <h3>Programar una reunión con {selectedProfessional.firstName} {selectedProfessional.lastName}</h3>
              <Form>
                <Form.Group controlId="meetingDate">
                  <Form.Label>Fecha de la reunión</Form.Label>
                  <Form.Control type="date" value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="meetingTime">
                  <Form.Label>Hora de la reunión</Form.Label>
                  <Form.Control type="time" value={meetingTime} onChange={(e) => setMeetingTime(e.target.value)} />
                </Form.Group>
                <Button variant="primary" onClick={handleCreateMeeting}>
                  Crear Reunión
                </Button>
              </Form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientSearch;

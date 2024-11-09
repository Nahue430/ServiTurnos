import React, { useState, useContext } from "react";
import { Form, Button, Row, Col, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticationContext } from '../../context/authenticationContext/AuthenticationContext';
import "./AdminSearch.css";

const AdminProfessionalSearch = () => {
    const [professionals, setProfessionals] = useState([]);
    const [showForm, setShowForm] = useState(true);
    const navigate = useNavigate();

    const { getProfessionalByProfession, GetAllProfessionals, deleteProfessional } = useContext(AuthenticationContext);

    const fetchProfessionals = async (profession) => {
        let data;
        if (profession === "all") {
            data = await GetAllProfessionals();
        } else if (profession) {
            data = await getProfessionalByProfession(profession);
        }
        setProfessionals(data || []);
        setShowForm(!data);
    };

    const handleResetSearch = () => {
        setShowForm(true);
        setProfessionals([]);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este profesional?");
        if (confirmed) {
            const success = await deleteProfessional(id);
            if (success) {
                setProfessionals(professionals.filter(professional => professional.id !== id));
            } else {
                alert("Error al eliminar el profesional");
            }
        }
    };

    return (
        <div className="buscar-container">
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="w-100" style={{ marginTop: "75.5px" }}>
                <Nav className="w-100 justify-content-between">
                    <Nav.Link as={Link} to="/HomeAdmin" className="mx-3">Volver</Nav.Link>
                    <Nav.Link as={Link} to="/" className="mx-3">Salir</Nav.Link>
                </Nav>
            </Navbar>

            {showForm && <h1>Seleccione el profesional que desea buscar:</h1>}

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
                                    <option value="all">Todos</option>
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
                    </div>
                    <ul className="professional-list">
                        {professionals.map((professional) => (
                            <li key={professional.id} className="professional-item">
                                <Row style={{ width: "70rem" }}>
                                    <Col md="3"><div><strong>Nombre:</strong> {professional.firstName} {professional.lastName}</div></Col>
                                    <Col md="2"><div><strong>Costo:</strong> {professional.fee}</div></Col>
                                    <Col md="2"><div><strong>Teléfono:</strong> {professional.phone}</div></Col>
                                    <Col md="3"><div><strong>Dirección:</strong> {professional.address}</div></Col>
                                    <Col md="2">
                                        <Button variant="danger" onClick={() => handleDelete(professional.id)}>Eliminar</Button>
                                    </Col>
                                </Row>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminProfessionalSearch;

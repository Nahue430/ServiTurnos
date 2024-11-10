import React, { useContext, useState } from 'react';
import { Form, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthenticationContext } from '../../context/authenticationContext/AuthenticationContext';
import useSearchAndDelete from '../../components/useSearchAndDelete/UseSearchAndDelete';
import './AdminSearch.css';

const AdminProfessionalSearch = () => {
    const [professionalId, setProfessionalId] = useState('');
    const { GetAllProfessionals, getProfessionalById, deleteProfessional } = useContext(AuthenticationContext);

    const {
        items: professionals,
        showForm,
        noResults,
        error,
        fetchItemById,
        fetchAllItems,
        resetSearch,
        handleDelete,
    } = useSearchAndDelete(getProfessionalById, GetAllProfessionals, deleteProfessional);

    const handleInputChange = (e) => {
        setProfessionalId(e.target.value);
    };

    return (
        <div className="buscar-container">
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="w-100" style={{ marginTop: "75.5px" }}>
                <Nav className="w-100 justify-content-between">
                    <Nav.Link as={Link} to="/HomeAdmin" className="mx-3">Volver</Nav.Link>
                    <Nav.Link as={Link} to="/" className="mx-3">Salir</Nav.Link>
                </Nav>
            </Navbar>

            {showForm && <h1>Buscar Profesionales:</h1>}

            {showForm && (
                <Form>
                    <Form.Group as={Row} className="centered-form">
                        <Row>
                            <Col lg="12">
                                <Form.Label column sm="12">Buscar por ID:</Form.Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="8">
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el ID del profesional"
                                    value={professionalId}
                                    onChange={handleInputChange}
                                    isInvalid={error}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, ingrese un ID para realizar la búsqueda.
                                </Form.Control.Feedback>
                            </Col>
                            <Col lg="4">
                                <Button variant="secondary" onClick={() => fetchItemById(professionalId)}>
                                    Buscar
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12">
                                <Form.Label column sm="12">Buscar todos:</Form.Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12">
                                <Button variant="secondary" onClick={fetchAllItems}>
                                    Buscar Todos
                                </Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            )}

            {noResults && (
                <div className="text-center mt-3">
                    <p>No se encontró ningún profesional con el ID especificado.</p>
                </div>
            )}

            {Array.isArray(professionals) && professionals.length > 0 && (
                <div>
                    <h2>Profesionales Encontrados:</h2>
                    <div className="button-container text-center">
                        <Button variant="secondary" onClick={resetSearch}>
                            Nueva Búsqueda
                        </Button>
                    </div>
                    <ul className="professional-list">
                        {professionals.map((professional) => (
                            <li key={professional.id} className="professional-item">
                                <Row style={{ width: "70rem" }}>
                                    <Col md="3">
                                        <div><strong>Nombre:</strong> <span>{professional.firstName} {professional.lastName}</span></div>
                                    </Col>
                                    <Col md="3">
                                        <div><strong>Email:</strong> <span>{professional.email}</span></div>
                                    </Col>
                                    <Col md="2">
                                        <div><strong>Teléfono:</strong> <span>{professional.phone}</span></div>
                                    </Col>
                                    <Col md="2">
                                        <div><strong>Especialidad:</strong> <span>{professional.specialty}</span></div>
                                    </Col>
                                    <Col md="1">
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
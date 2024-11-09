import React, { useState, useContext } from 'react';
import { Form, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthenticationContext } from '../../context/authenticationContext/AuthenticationContext';
import './AdminClientSearch.css';

const AdminClientSearch = () => {
    const [clients, setClients] = useState([]);
    const [showForm, setShowForm] = useState(true);
    const [clientId, setClientId] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [idError, setIdError] = useState(false);

    const { GetAllCustomers, getCustomerById, deleteCustomer } = useContext(AuthenticationContext);

    const fetchClientById = async () => {
        if (!clientId) {
            setIdError(true);
            return;
        }

        setIdError(false);
        const data = await getCustomerById(clientId);
        setClients(data ? [data] : []);
        setShowForm(false);
        setNoResults(!data); // Solo muestra el mensaje si no se encuentra ningún cliente
    };

    const fetchAllClients = async () => {
        setIdError(false);
        const data = await GetAllCustomers();
        setClients(data || []);
        setShowForm(false);
        setNoResults(!(data && data.length > 0)); // Solo muestra el mensaje si no hay clientes en total
    };

    const handleResetSearch = () => {
        setShowForm(true);
        setClients([]);
        setClientId('');
        setNoResults(false);
        setIdError(false);
    };

    const handleInputChange = (e) => {
        setClientId(e.target.value);
        if (idError) setIdError(false); // Resetea el error cuando el usuario empieza a escribir
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este cliente?");
        if (confirmed) {
            const success = await deleteCustomer(id);
            if (success) {
                setClients(clients.filter(client => client.id !== id));
            } else {
                alert("Error al eliminar el cliente");
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

            {showForm && <h1>Buscar Clientes:</h1>}

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
                                    placeholder="Ingrese el ID del cliente"
                                    value={clientId}
                                    onChange={handleInputChange}
                                    isInvalid={idError} // Borde rojo cuando hay error
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, ingrese un ID para realizar la búsqueda.
                                </Form.Control.Feedback>
                            </Col>
                            <Col lg="4">
                                <Button variant="secondary" onClick={fetchClientById}>
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
                                <Button variant="secondary" onClick={fetchAllClients}>
                                    Buscar Todos
                                </Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            )}

            {noResults && (
                <div className="text-center mt-3">
                    <p>No se encontró ningún cliente con el ID especificado.</p>
                </div>
            )}

            {Array.isArray(clients) && clients.length > 0 && (
                <div>
                    <h2>Clientes Encontrados:</h2>
                    <div className="button-container text-center">
                        <Button variant="secondary" onClick={handleResetSearch}>
                            Nueva Búsqueda
                        </Button>
                    </div>
                    <ul className="client-list">
                        {clients.map((client) => (
                            <li key={client.id} className="client-item">
                                <Row style={{ width: "70rem" }}>
                                    <Col md="3">
                                        <div><strong>Nombre:</strong> <span>{client.firstName} {client.lastName}</span></div>
                                    </Col>
                                    <Col md="3">
                                        <div><strong>Email:</strong> <span>{client.email}</span></div>
                                    </Col>
                                    <Col md="2">
                                        <div><strong>Teléfono:</strong> <span>{client.phone}</span></div>
                                    </Col>
                                    <Col md="2">
                                        <div><strong>Dirección:</strong> <span>{client.address}</span></div>
                                    </Col>
                                    <Col md="1">
                                        <Button variant="danger" onClick={() => handleDelete(client.id)}>Eliminar</Button>
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

export default AdminClientSearch;

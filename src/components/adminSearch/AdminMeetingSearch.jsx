import React, { useState, useEffect, useContext } from "react";
import { AuthenticationContext } from '../../context/authenticationContext/AuthenticationContext';
import { Table, Button, Modal, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import './AdminSearch.css';

const AdminMeetingSearch = () => {
  const { getCustomerInMeetingsById, getProfessionalInMeetingsById, deleteMeeting } = useContext(AuthenticationContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7212/api/meeting', {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const allReservations = await response.json();

        const reservationsWithDetails = await Promise.all(
          allReservations.map(async (reservation) => {
            const [client, professional] = await Promise.all([
              getCustomerInMeetingsById(reservation.customerId),
              getProfessionalInMeetingsById(reservation.professionalId),
            ]);
            return { ...reservation, client, professional };
          })
        );

        setReservations(reservationsWithDetails);
      } else {
        console.error('Error al obtener las reservas');
      }
    } catch (error) {
      console.error('Error al hacer la solicitud', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReservation = async () => {
    if (selectedReservation) {
      try {
        await deleteMeeting(selectedReservation.id);
        setReservations(reservations.filter(reservation => reservation.id !== selectedReservation.id));
      } catch (error) {
        console.error("Error al eliminar la reserva:", error);
      } finally {
        setShowDeleteModal(false);
      }
    }
  };

  const handleShowDeleteModal = (reservation) => {
    setSelectedReservation(reservation);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedReservation(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="reservations-container">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="w-100" style={{ marginTop: "75.5px" }}>
        <Nav className="w-100 justify-content-between">
          <Nav.Link as={Link} to="/homeAdmin" className="mx-3">Volver</Nav.Link>
          <Nav.Link as={Link} to="/" className="mx-3">Salir</Nav.Link>
        </Nav>
      </Navbar>

      <h1>Reservas de Todos los Clientes</h1>
      
      <Button onClick={fetchReservations} disabled={loading}>
        {loading ? 'Cargando...' : 'Ver reservas'}
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Cliente</th>
            <th>Profesional</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{new Date(reservation.date).toLocaleDateString()}</td>
                <td>{new Date(reservation.date).toLocaleTimeString()}</td>
                <td>{reservation.client ? `${reservation.client.firstName} ${reservation.client.lastName}` : 'Cargando...'}</td>
                <td>{reservation.professional ? `${reservation.professional.firstName} ${reservation.professional.lastName}` : 'Cargando...'}</td>
                <td>
                  <Button variant="danger" onClick={() => handleShowDeleteModal(reservation)}>Eliminar</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay reservas disponibles.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas eliminar esta reserva?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancelar</Button>
          <Button variant="danger" onClick={handleDeleteReservation}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminMeetingSearch;

import React, { useState, useEffect, useContext } from "react";
import { AuthenticationContext } from '../../context/authenticationContext/AuthenticationContext';
import { Table, Button, Modal, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProfessionalReservations = () => {
  const { user, getMeetingsByProfessionalId, getCustomerInMeetingsById, deleteMeeting } = useContext(AuthenticationContext);
  const [reservations, setReservations] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    if (user) {
      const decodedToken = JSON.parse(atob(user.split('.')[1]));
      const professionalId = decodedToken.Id;

      const fetchReservations = async () => {
        const professionalReservations = await getMeetingsByProfessionalId(professionalId);
        if (professionalReservations) {
          const reservationsWithClients = await Promise.all(professionalReservations.map(async (reservation) => {
            const client = await getCustomerInMeetingsById(reservation.customerId);
            return { ...reservation, client };
          }));
          setReservations(reservationsWithClients);
        }
      };

      fetchReservations();
    }
  }, [user, getMeetingsByProfessionalId, getCustomerInMeetingsById]);

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
          <Nav.Link as={Link} to="/homeProfessional" className="mx-3">Perfil</Nav.Link>
          <Nav.Link as={Link} to="/reservasProfessional" className="mx-3">Reservas</Nav.Link>
          <Nav.Link as={Link} to="/" className="mx-3">Salir</Nav.Link>
        </Nav>
      </Navbar>
      <h1>Mis Reservas</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Cliente</th>
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
                <td>
                  <Button variant="danger" onClick={() => handleShowDeleteModal(reservation)}>Eliminar</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No tienes reservas disponibles.</td>
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

export default ProfessionalReservations;

import React, { useState, useEffect, useContext } from "react";
import { AuthenticationContext } from '../../context/authenticationContext/AuthenticationContext';
import { Table, Button, Modal, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const ClientReservations = () => {
  const { user, getMeetingsByCustomerId, getProfessionalInMeetingsById } = useContext(AuthenticationContext);
  const [reservations, setReservations] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    if (user) {
      const decodedToken = JSON.parse(atob(user.split('.')[1]));
      const customerId = decodedToken.Id;

      const fetchReservations = async () => {
        const customerReservations = await getMeetingsByCustomerId(customerId);
        if (customerReservations) {
          // Aquí obtenemos el profesional de cada reserva
          const reservationsWithProfessionals = await Promise.all(customerReservations.map(async (reservation) => {
            const professional = await getProfessionalInMeetingsById(reservation.professionalId);
            return { ...reservation, professional }; // Agregamos el profesional a la reserva
          }));
          setReservations(reservationsWithProfessionals);
        }
      };

      fetchReservations();
    }
  }, [user, getMeetingsByCustomerId, getProfessionalInMeetingsById]);

  const handleDeleteReservation = async () => {
    // Lógica para eliminar la reserva seleccionada
    if (selectedReservation) {
      // Aquí deberías agregar la función para eliminar la reserva
      // Ejemplo: await deleteReservation(selectedReservation.id);

      // Luego de eliminar, cerramos el modal y actualizamos las reservas
      setReservations(reservations.filter(reservation => reservation.id !== selectedReservation.id));
      setShowDeleteModal(false);
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
          <Nav.Link as={Link} to="/homeClient" className="mx-3">Perfil</Nav.Link>
          <Nav.Link as={Link} to="/clientSearch" className="mx-3">Buscar</Nav.Link>
          <Nav.Link as={Link} to="/reservasClient" className="mx-3">Reservas</Nav.Link>
          <Nav.Link as={Link} to="/" className="mx-3">Salir</Nav.Link>
        </Nav>
      </Navbar>
      <h1>Mis Reservas</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Profesional</th>
            
          </tr>
        </thead>
        <tbody>
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{new Date(reservation.date).toLocaleDateString()}</td>
                <td>{new Date(reservation.date).toLocaleTimeString()}</td>
                <td>{reservation.professional ? `${reservation.professional.firstName} ${reservation.professional.lastName}` : 'Cargando...'}</td>
                
                <td>
                  <Button variant="danger" onClick={() => handleShowDeleteModal(reservation)}>Eliminar</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No tienes reservas disponibles.</td>
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

export default ClientReservations;

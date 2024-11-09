import React, { useState, useContext } from "react";
import { Button, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthenticationContext } from '../../context/authenticationContext/AuthenticationContext';

const HomeAdmin = () => {
  const { getCustomers, getProfessionals } = useContext(AuthenticationContext);
  const [clientsList, setClientsList] = useState([]);
  const [professionalsList, setProfessionalsList] = useState([]);
  const [view, setView] = useState(""); // Define if showing clients or professionals list

  const handleShowClients = async () => {
    const clients = await getCustomers();
    setClientsList(clients);
    setView("clients");
  };

  const handleShowProfessionals = async () => {
    const professionals = await getProfessionals();
    setProfessionalsList(professionals);
    setView("professionals");
  };

  return (
    <div className="admin-container">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="w-100" style={{ marginTop: "75.5px" }}>
        <Nav className="w-100 justify-content-between">
          <Nav.Link as={Link} to="/homeAdmin" className="mx-3">Admin Home</Nav.Link>
          <Nav.Link as={Link} to="/" className="mx-3">Salir</Nav.Link>
        </Nav>
      </Navbar>

      <h1>Panel de Administrador</h1>
      <div className="button-container">
        <Button variant="primary" onClick={handleShowClients} className="m-2">Lista de Clientes</Button>
        <Button variant="secondary" onClick={handleShowProfessionals} className="m-2">Lista de Profesionales</Button>
      </div>

      {view === "clients" && (
        <div className="list-container">
          <h2>Lista de Clientes</h2>
          <ul>
            {clientsList.map((client, index) => (
              <li key={index}>{client.name} - {client.email}</li>
            ))}
          </ul>
        </div>
      )}

      {view === "professionals" && (
        <div className="list-container">
          <h2>Lista de Profesionales</h2>
          <ul>
            {professionalsList.map((professional, index) => (
              <li key={index}>{professional.name} - {professional.email}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomeAdmin;

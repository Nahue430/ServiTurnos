import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HomeAdmin.css';

const HomeAdmin = () => {

  return (
    <div className="perfil-container">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="w-100" style={{ marginTop: "75.5px" }}>
        <Nav className="w-100 justify-content-between">
          <Nav.Link as={Link} to="/adminClientSearch" className="mx-3">Buscar Clientes</Nav.Link>
          <Nav.Link as={Link} to="/adminProfessionalSearch" className="mx-3">Buscar Profesionales</Nav.Link>
          <Nav.Link as={Link} to="/adminMeetingSearch" className="mx-3">Buscar Reservas</Nav.Link>
          <Nav.Link as={Link} to="/" className="mx-3">Salir</Nav.Link>
        </Nav>
      </Navbar>

      <div className="centered-message">
        <div className="message-content">
          <h1>Bienvenido a la Sección Administrador</h1>
          <p>
            En esta sección, puedes gestionar a los clientes y profesionales de nuestra plataforma. 
            Utiliza la barra de navegación para buscar profesionales o clientes, aplicar filtros según corresponda 
            y eliminar usuarios que infrinjan las normas de la plataforma.
          </p>
          <p>
            Si experimentas algún desperfecto en la página, por favor, comunícate con el soporte técnico 
            a través de <a href="mailto:sistemas@serviturnos.com.ar">sistemas@serviturnos.com.ar</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;

import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col, Navbar, Nav, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthenticationContext } from '../../context/authenticationContext/AuthenticationContext';
import "./HomeAdmin.css";

const HomeAdmin = () => {

    
  return (
    <div className="perfil-container">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="w-100" style={{ marginTop: "75.5px" }}>
        <Nav className="w-100 justify-content-between">
          <Nav.Link as={Link} to="/#" className="mx-3">Clientes</Nav.Link>
          <Nav.Link as={Link} to="/#" className="mx-3">Profesionales</Nav.Link>
          <Nav.Link as={Link} to="/" className="mx-3">Salir</Nav.Link>
        </Nav>
      </Navbar>


    </div>
  );
};

export default HomeAdmin;
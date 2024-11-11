import React from "react";
import { Col, Row, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import "./Header.css";

const Header = () => {
  const location = useLocation();

  const hideButtonsPaths = ["/homeClient", "/homeProfessional", "/homeAdmin", "/clientSearch", "/"];

  const shouldHideButtons = hideButtonsPaths.includes(location.pathname);

  return (
    <header className="header">
      <Row className="align-items-center">
        <Col md={{ span: 6, offset: 3 }} className="text-center">
          <h1>ServiTurnos</h1>
        </Col>
        {!shouldHideButtons && (
          <Col md={3} className="text-end">
            <Link to="/login">
              <Button variant="primary" className="me-2">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary">Sign up</Button>
            </Link>
          </Col>
        )}
      </Row>
    </header>
  );
};

export default Header;

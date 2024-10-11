import React from "react";
import { Col, Row } from 'react-bootstrap';
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <Row className="align-items-center">
        <Col md={{ span: 6, offset: 3 }} className="text-center">
          <h1>ServiTurnos</h1>
        </Col>
        <Col md={3} className="text-end">
          <p>Login | Signin | Contact</p>
        </Col>
      </Row>
    </header>
  );
};

export default Header;

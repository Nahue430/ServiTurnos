import React from "react";
import "./Footer.css";
import {Col,Row} from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="footer">
        <Row>
            <Col md="6">
      <p>ServiTurnos ®</p>
            </Col>
            <Col md="6">
            <p>Contactenos: contacto@serviturnos.com</p>
            </Col>
        </Row>
    </footer>
  );
};

export default Footer;
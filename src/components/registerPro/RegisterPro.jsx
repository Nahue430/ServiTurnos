import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Row, Col, Button} from 'react-bootstrap'
import './RegisterPro.css';

const RegisterPro = () => {
  const navigate = useNavigate();

  const [rubro, setRubro] = useState('');
  const [matricula, setMatricula] = useState('');
  const [tarifaBase, setTarifaBase] = useState('');
  const [error, setError] = useState('');

  const isMatriculaRequired = !(rubro === 'Carpintero' || rubro === 'Plomero' || rubro === 'Otro');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if ((!rubro.trim() || !tarifaBase.trim()) || (isMatriculaRequired && !matricula.trim())) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (tarifaBase.length > 5) {
      setError('La tarifa base no puede tener más de 5 dígitos.');
      return;
    }

    console.log({ rubro, matricula, tarifaBase });

    navigate('/HomeProfessional');
  };

  const handleBack = () => {
    navigate('/Register');
  };

  return (
    <div>
      
      <h1>Registrarse como Profesional</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Selecciona tu rubro:
            <select value={rubro} onChange={(e) => setRubro(e.target.value)} required>
              <option value="">Seleccione...</option>
              <option value="Electricista">Electricista</option>
              <option value="Carpintero">Carpintero</option>
              <option value="Gasista">Gasista</option>
              <option value="Plomero">Plomero</option>
              <option value="Refrigeracion">Refrigeracion</option>
              <option value="Otro">Otro</option>
            </select>
          </label>
        </div>

        {isMatriculaRequired && (
          <div>
            <label>
              Ingrese su matrícula:
              <input
                type="text"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                required={isMatriculaRequired}
              />
            </label>
          </div>
        )}

        <div>
          <label>
            Ingrese su tarifa base:
            <input
              type="number"
              value={tarifaBase}
              onChange={(e) => setTarifaBase(e.target.value)}
              max="99999"
              required
            />
          </label>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Row style={{padding: '10px'}}>
          <Col md="7">
        <Button type="submit"  variant="success" className="ms-2">Registrarse</Button>
        </Col>
        <Col md="5">
        <Button type="button" variant="secondary" onClick={handleBack} className="ms-2">Volver</Button>
        </Col>
        </Row>
      </form>

    </div>
  );
};

export default RegisterPro;
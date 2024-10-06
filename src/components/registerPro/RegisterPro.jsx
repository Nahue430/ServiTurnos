import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPro = () => {
  const navigate = useNavigate();

  const [rubro, setRubro] = useState('');
  const [matricula, setMatricula] = useState('');
  const [tarifaBase, setTarifaBase] = useState('');
  const [error, setError] = useState('');

  // Verifica si el rubro seleccionando requiere matrícula
  const isMatriculaRequired = !(rubro === 'Carpintero' || rubro === 'Plomero' || rubro === 'Otro');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validar que todos los campos requeridos estén completos
    if ((!rubro.trim() || !tarifaBase.trim()) || (isMatriculaRequired && !matricula.trim())) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Validar que la tarifa base no tenga más de 5 dígitos
    if (tarifaBase.length > 5) {
      setError('La tarifa base no puede tener más de 5 dígitos.');
      return;
    }

    // Si todo es válido, mostrar los datos (puedes hacer el registro aquí)
    console.log({ rubro, matricula, tarifaBase });

    // Redirigir al siguiente paso
    navigate('/success');  // Redirigir al componente de gestión de perfil de profesional
  };

  const handleBack = () => {
    navigate('/');
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

        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Mostrar mensaje de error si es necesario */}

        <button type="submit">Registrar</button>
      </form>

      <button onClick={handleBack}>Volver</button>
    </div>
  );
};

export default RegisterPro;
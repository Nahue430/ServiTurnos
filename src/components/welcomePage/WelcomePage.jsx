import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const WelcomePage = () => {
    const navigate = useNavigate();
    const buttonRef = useRef(null);

    // Función para volver arriba
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNavigation = (type) => {
        if (type === 'login') {
            navigate('/login');
        } else {
            navigate('/register');
        }
    };

    const buttonStyle = {
        backgroundColor: 'brown',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
        marginTop: '20px',  // Añadir espacio entre el texto y el botón
    };

    const buttonStyleLogin = {
        ...buttonStyle,
        marginRight: '10px', // Separar los botones
    };

    const aboutSectionStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
    };

    const textStyle = {
        fontSize: '20px',
        lineHeight: '2',
        wordWrap: 'break-word',
        maxWidth: '800px',
        margin: '0 auto',
    };

    const imageStyle = {
        maxWidth: '100%',
        height: 'auto',
        marginTop: '10px',
        marginBottom: '10px',
    };

    return (
        <div>
            <h2>Bienvenido</h2>
            <button style={buttonStyleLogin} onClick={() => handleNavigation('login')}>Iniciar sesión</button>
            <button style={buttonStyle} onClick={() => handleNavigation('register')}>Registrarse</button>
            <div>
                <img
                    src="https://img.freepik.com/foto-gratis/apreton-manos-senal-saludo_1139-111.jpg?t=st=1728687365~exp=1728690965~hmac=c2117559ce2f82804e1a24448f91c28286f0e9d96c10ee5506826f97e3d8b929&w=740"
                    alt="Imagen"
                    style={imageStyle}
                />
            </div>
            <div style={aboutSectionStyle}>
                <div style={textStyle}>
                    <h3>Sobre nosotros</h3>
                    <p>
                        Nuestro objetivo es brindar a la población una forma más fácil y segura de conectarse con profesionales de diversas áreas.
                        A través de nuestra plataforma, los usuarios podrán acceder a servicios especializados, agendar citas de manera rápida y sin preocupaciones, eliminando las barreras tradicionales de comunicación.
                        Para los profesionales, ofrecemos una oportunidad única para aumentar su visibilidad, gestionar su agenda de manera más eficiente y llegar a una mayor cantidad de clientes.
                        Con esta solución innovadora, buscamos facilitar tanto el acceso a servicios de calidad como la optimización del tiempo y recursos de los profesionales registrados.
                    </p>
                </div>
            </div>

            {/* Botón debajo del bloque de texto */}
            <Button
                ref={buttonRef}
                style={buttonStyle}
                onClick={scrollToTop}
            >
                Volver arriba
            </Button>
        </div>
    );
};

export default WelcomePage;

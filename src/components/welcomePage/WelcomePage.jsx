import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './WelcomePage.css';

const WelcomePage = () => {
    const navigate = useNavigate();
    const buttonRef = useRef(null);

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

    return (
        <div>
            <h2>Bienvenido</h2>
            <button className="buttonStyle" onClick={() => handleNavigation('login')}>Iniciar sesión</button>
            <button className="buttonStyle" onClick={() => handleNavigation('register')}>Registrarse</button>

            {/* Coloca la imagen justo debajo de los botones */}
            <div className="image-container">
                <img
                    src="https://img.freepik.com/foto-gratis/apreton-manos-senal-saludo_1139-111.jpg?t=st=1728687365~exp=1728690965~hmac=c2117559ce2f82804e1a24448f91c28286f0e9d96c10ee5506826f97e3d8b929&w=740"
                    alt="Imagen"
                    className="blurred-image"
                />
            </div>

            <div className="aboutSectionStyle">
                <div className="textStyle">
                    <h3>Sobre nosotros</h3>
                    <p>
                        Nuestro objetivo es brindar a la población una forma más fácil y segura de conectarse con profesionales de diversas áreas.
                        A través de nuestra plataforma, los usuarios podrán acceder a servicios especializados, agendar citas de manera rápida y sin preocupaciones, eliminando las barreras tradicionales de comunicación.
                        Para los profesionales, ofrecemos una oportunidad única para aumentar su visibilidad, gestionar su agenda de manera más eficiente y llegar a una mayor cantidad de clientes.
                        Con esta solución innovadora, buscamos facilitar tanto el acceso a servicios de calidad como la optimización del tiempo y recursos de los profesionales registrados.
                    </p>
                </div>
            </div>

            <Button
                ref={buttonRef}
                className="buttonStyle"
                onClick={scrollToTop}
            >
                Volver arriba
            </Button>
        </div>
    );
};

export default WelcomePage;
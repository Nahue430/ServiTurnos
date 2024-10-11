import { useNavigate } from 'react-router-dom';
import {Row, Col, Button} from 'react-bootstrap'

const WelcomePage = () => {
    const navigate = useNavigate(); 

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
        border: '3px light grey',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
    };
    const aboutSectionStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: '30px', // Espacio entre los botones y la sección "Sobre nosotros"
        padding: '20px',
        backgroundColor: '#f8f9fa', // Puedes cambiar el color de fondo si quieres
        borderRadius: '8px',
    };
    const textStyle = {
        fontSize: '16px', // Tamaño de fuente
        lineHeight: '1.6', // Espacio entre las líneas
        wordWrap: 'break-word', // Romper las palabras largas en líneas si es necesario
        maxWidth: '800px', // Ancho máximo para evitar que el texto se alargue demasiado en pantallas grandes
        margin: '0 auto', // Centrar el texto
    };

    return (
        <div>
            <h2>Bienvenido</h2>
            <button style={buttonStyle} onClick={() => handleNavigation('login')}>Iniciar sesión</button>
            <button style={buttonStyle} onClick={() => handleNavigation('register')}>Registrarse</button>
            <div style={aboutSectionStyle}>
                <div style={textstyle}>
                    <h3>Sobre nosotros</h3>
                    <p>Nuestro objetivo es brindar a la población una forma más fácil y segura de conectarse con profesionales de diversas áreas.
                    A través de nuestra plataforma, los usuarios podrán acceder a servicios especializados, agendar citas de manera rápida y sin preocupaciones, eliminando las barreras tradicionales de comunicación.
                    Para los profesionales, ofrecemos una oportunidad única para aumentar su visibilidad, gestionar su agenda de manera más eficiente y llegar a una mayor cantidad de clientes.
                    Con esta solución innovadora, buscamos facilitar tanto el acceso a servicios de calidad como la optimización del tiempo y recursos de los profesionales registrados.</p>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
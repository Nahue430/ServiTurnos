import { useNavigate } from 'react-router-dom';
import {Row, Col} from 'react-bootstrap'

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
        backgroundColor: '#0d6efd',
        color: 'white',
        border: '3px light grey',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
    };

    return (
        <div>
            <h2>Bienvenido</h2>
            <Row style={{padding: '10px'}}>

            <button style={buttonStyle} onClick={() => handleNavigation('login')}>Iniciar sesión</button>
            </Row>
            <Row>
            <button style={buttonStyle} onClick={() => handleNavigation('register')}>Registrarse</button>
            </Row>
        </div>
    );
};

export default WelcomePage;
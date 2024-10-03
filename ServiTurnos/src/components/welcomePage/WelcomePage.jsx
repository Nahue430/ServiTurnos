import { useNavigate } from "react-router-dom";



const WelcomePage = () => {
    const navigate = useNavigate(); //esto es para navegar entre componentes

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
        transition: 'background-color 0.3s' 
       
    };


    
    return (
        <div>
            <h2>Bienvenido</h2>
            <button style= {buttonStyle} onClick={() => handleNavigation('login')}>Iniciar sesión</button>
            <button style= {buttonStyle} onClick={() => handleNavigation('register')}>Registrarse</button>
        </div>
    );
};

export default WelcomePage;
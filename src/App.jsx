import './App.css';
import WelcomePage from './components/welcomePage/WelcomePage';
import Register from './components/register/Register';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//element es donde especificamos que componente debe renderizar, no hace falta props
//porque lo estamos pasando mediante una ruta = Route
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} /> 
        
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;

//Comentario de prueba II
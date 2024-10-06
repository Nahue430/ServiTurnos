import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from '../welcomePage/WelcomePage';
import Register from '../register/Register';
import Login from '../login/Login';
import ResetPassword from '../resetPassword/ResetPassword';

const RoutesComponent = () => { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
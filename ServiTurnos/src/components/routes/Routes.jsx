import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/welcomePage/WelcomePage';
import Register from './components/register/Register';

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;


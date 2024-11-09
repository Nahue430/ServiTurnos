import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import RoutesComponent from './components/routes/Routes'; // Asegúrate de que la ruta sea correcta
import { BrowserRouter } from 'react-router-dom';



const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <RoutesComponent />
      <Footer/>
      </BrowserRouter>
    </div>
  );
};

export default App;
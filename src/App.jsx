import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import RoutesComponent from './components/routes/Routes'; // Asegúrate de que la ruta sea correcta


const App = () => {
  return (
    <div>
      <Header/>
      <RoutesComponent />
      <Footer/>
    </div>
  );
};

export default App;
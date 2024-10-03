import './App.css';
import WelcomePage from './components/welcomePage/WelcomePage';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <WelcomePage />
      </div>
    </Router>
  );
}

export default App;
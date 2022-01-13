import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';

// import components
import HomePage from './components/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={ROUTES.HOME} element={<HomePage/>} />
      </Routes>
    </Router>
  );
}

export default App;

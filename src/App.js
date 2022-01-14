import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';

// import components
import HomePage from './components/home';
import AzureCall from './components/azure-communications';
import AuthPage from './components/auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={ROUTES.HOME} element={<HomePage/>} /> 
        <Route path path={ROUTES.CALL} element={<AzureCall/>} />
        <Route path path={ROUTES.AUTH} element={<AuthPage/>} />
      </Routes>
    </Router>
  );
}

export default App;

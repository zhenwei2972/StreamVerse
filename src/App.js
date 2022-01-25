import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';

// import components
import HomePage from './components/home';
import AzureCall from './components/azure-communications';
import AuthPage from './components/auth';
import StartPage from './components/start';
import logo from "./svlogo.PNG"
import Welcome from 'react-welcome-page'

function App() {
  return (
    <><Welcome
      loopDuration={1000}
      data={[
        {
          "backgroundColor": "rgb(255, 255, 255)",
          "textColor": "#294472",
          "text": "Welcome to Stream Verse",
          "image": logo
        }
      ]} />
      
        <Router>
          <Routes>

            <Route path path={ROUTES.AUTH} element={<AuthPage />} />
            <Route exact path={ROUTES.HOME} element={<HomePage />} />
            <Route path path={ROUTES.CALL} element={<AzureCall />} />
            <Route path path={ROUTES.START} element={<StartPage />} />
          </Routes>
        </Router></>
    
  );
}

export default App;

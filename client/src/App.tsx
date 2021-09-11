import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import CourseSelection from './components/Pages/CourseSelection';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Results from './components/Pages/Results';
import LoginInterface from './components/Login/LoginInterface';
import NavBar from './components/Nav/NavBar';
import Sidebar from 'react-sidebar';
import NavSide from './components/Nav/NavSide';
import Profile from './components/Pages/Profile';
import axios from 'axios';
import { Size } from './enums/Size';
import WelcomePage from './components/Pages/WelcomePage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [sidebar, setSidebar] = useState<boolean>(false);

  const handleToggleLoggedIn = (value: boolean) => setLoggedIn(value);

  const handleToggleSidebar = () => setSidebar(!sidebar);

  const handleLogout = async () => {
    await axios.post(
      'http://localhost:8080/auth/logout',
      {},
      {
        withCredentials: true,
      },
    );
    setLoggedIn(false);
  };

  return (
    <div>
      <Router>
        <Sidebar
          open={sidebar}
          onSetOpen={handleToggleSidebar}
          sidebar={
            <NavSide
              onSidebar={handleToggleSidebar}
              loggedIn={loggedIn}
              onLogout={handleLogout}
            />
          }
        >
          <NavBar
            loggedIn={loggedIn}
            onSidebar={handleToggleSidebar}
            size={Size.FULL}
          />
          <Route path="/courseSelection">
            {loggedIn ? <CourseSelection /> : <Redirect push to="/login" />}
          </Route>
          <Route path="/schedule/:scheduleId">
            <Results />
          </Route>
          <Route path="/login">
            <LoginInterface onLogin={handleToggleLoggedIn} />
          </Route>
          <Route path="/user">
            {loggedIn ? (
              <Profile onLogout={handleLogout} />
            ) : (
              <Redirect push to="/login" />
            )}
          </Route>
          <Route exact path="/">
            <WelcomePage />
          </Route>
        </Sidebar>
      </Router>
    </div>
  );
};

export default App;

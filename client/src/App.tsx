import { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import CourseSelection from './pages/CourseSelection';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Results from './pages/Results';
import LoginInterface from './components/Login/LoginInterface';
import NavBar from './components/Nav/NavBar';
import Sidebar from 'react-sidebar';
import NavSide from './components/Nav/NavSide';
import Profile from './components/Profile';

const App = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [sidebar, setSidebar] = useState<boolean>(false);

  const handleToggleLoggedIn = (value: boolean) => setLoggedIn(value);

  const handleToggleSidebar = () => setSidebar(!sidebar);

  useEffect(() => {}, []);

  return (
    <div>
      <Router>
        <Sidebar
          open={sidebar}
          onSetOpen={handleToggleSidebar}
          sidebar={
            <NavSide onSidebar={handleToggleSidebar} loggedIn={loggedIn} />
          }
        >
          <NavBar loggedIn={loggedIn} onSidebar={handleToggleSidebar} />
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
            {loggedIn ? <Profile /> : <Redirect push to="/login" />}
          </Route>
        </Sidebar>
      </Router>
    </div>
  );
};

export default App;

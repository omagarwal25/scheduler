import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import Button from './components/Button';
import CourseSelection from './pages/CourseSelection';
import { CourseInterface } from './interfaces/Courses';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Results from './pages/Results';

const App = () => {
  return (
    <Router>
      <div className="grid grid-flow-row grid-cols-1">
        <Route path="/courseSelection">
          <CourseSelection />
        </Route>
        <Route path={`/:scheduleId`}>
          <Results />
        </Route>
      </div>
    </Router>
  );
};

export default App;

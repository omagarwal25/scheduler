import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import Button from './components/Button';
import CourseSelection from './pages/CourseSelection';
import { CourseInterface } from './interfaces/Courses';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  const [requiredCourses, setRequiredCourses] = useState<CourseInterface[]>([]);
  const [showCourses, setShowCourses] = useState<boolean>(true);

  return (
    <Router>
      <div className="grid grid-flow-row grid-cols-1">
        <Route path="/">
          <CourseSelection />
        </Route>
      </div>
    </Router>
  );
};

export default App;

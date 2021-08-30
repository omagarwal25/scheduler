import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import Button from './components/Button';
import CourseSelection from './components/CourseSelection';

const App = () => {
  const [requiredCourses, setRequiredCourses] = useState<string[]>([]);
  const [showCourses, setShowCourses] = useState<boolean>(true);

  const handleSetRequiedCourses = (value: string[]) => {
    setRequiredCourses(value);
  };

  const handleToggleShowCourses = () => setShowCourses(!showCourses);

  return (
    <div className="grid grid-flow-row grid-cols-1">
      {showCourses ? (
        <CourseSelection
          onSetRequiedCourses={handleSetRequiedCourses}
          onToggleShowCourses={handleToggleShowCourses}
        />
      ) : (
        <>
          {requiredCourses.map((e) => (
            <h1>{e}</h1>
          ))}
          <Button
            text="Go Back"
            onClick={handleToggleShowCourses}
            additionalCSS="m-2 w-auto text-white bg-red-600 m-2"
          />
        </>
      )}
    </div>
  );
};

export default App;

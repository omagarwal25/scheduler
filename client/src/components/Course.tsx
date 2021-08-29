import { ReactElement } from 'react';
import { CourseInterface } from '../interfaces/Courses';
import Credits from './Credits';
import Semester from './Semester';
import { getColor } from '../services/getColor';

interface Props {
  course: CourseInterface;
}

function Course({ course }: Props): ReactElement {
  let classColor = getColor(course.credits[0]);

  return (
    <div
      className={`p-2 rounded-md shadow-md bg-gradient-to-bl from-${classColor}-50 to-${classColor}-200 hover:from-${classColor}-100 hover:to-${classColor}-300`}
    >
      <h1 className="font-bold">{course.name}</h1>
      <Credits credits={course.credits} />
      <Semester semester={course.semester} />
    </div>
  );
}

export default Course;

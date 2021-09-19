import { CourseInterface } from '../../interfaces/Courses';
import Credits from './Credits';
import Semester from './Semester';
import { getColor } from '../services/getColor';

interface Props {
  course: CourseInterface;
  onSelection: (course: CourseInterface) => void;
  selected: boolean;
}

const Course = ({ course, onSelection, selected }: Props) => {
  return (
    <label
      className={`p-2 rounded-md cursor-pointer shadow-md bg-gradient-to-bl ${getColor(
        course.credits[0],
        selected,
      )}`}
      onClick={() => onSelection(course)}
    >
      <h1 className="font-bold">{course.name}</h1>
      <Credits credits={course.credits} />
      <Semester semester={course.semester} />
    </label>
  );
};

export default Course;

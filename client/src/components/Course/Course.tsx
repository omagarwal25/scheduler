import { CourseInterface } from '../../interfaces/Courses';
import Credits from './Credits';
import Semester from './Semester';
import { getColor } from '../../services/getColor';

interface Props {
  course: CourseInterface;
  onSelection: (course: CourseInterface) => void;
  selected: boolean;
}

const Course = ({ course, onSelection, selected }: Props) => {
  let classColor = getColor(course.credits[0]);
  let cssClass: string =
    'p-2 rounded-md cursor-pointer shadow-md bg-gradient-to-bl ';
  if (selected) {
    if (course.credits[0] === 'PE') {
      cssClass += `hover:to-gray-100 hover:from-gray-100 to-gray-300 from-white focus:to-gray-300 focus:from-white`;
    } else {
      cssClass += `hover:from-${classColor}-50 hover:to-${classColor}-200 from-${classColor}-200 to-${classColor}-400`;
    }
  } else {
    if (course.credits[0] === 'PE') {
      cssClass += `to-gray-100 from-gray-100 hover:to-gray-300 hover:from-white focus:to-gray-300 focus:from-white`;
    } else {
      cssClass += `from-${classColor}-50 to-${classColor}-200 hover:from-${classColor}-200 hover:to-${classColor}-400`;
    }
  }

  return (
    <label className={cssClass} onClick={() => onSelection(course)}>
      <h1 className="font-bold">{course.name}</h1>
      <Credits credits={course.credits} />
      <Semester semester={course.semester} />
    </label>
  );
};

export default Course;

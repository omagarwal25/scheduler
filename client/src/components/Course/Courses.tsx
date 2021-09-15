import { CourseInterface } from '../../interfaces/Courses';
import Course from './Course';

interface Props {
  courses: CourseInterface[];
  onSelection: (course: CourseInterface) => void;
  selected: CourseInterface[];
  rows: number[];
}

const Courses = ({ courses, onSelection, selected, rows }: Props) => {
  return (
    <div
      className={`grid grid-flow-row gap-5 p-2 sm:grid-cols-${rows[0]} md:grid-cols-${rows[1]} lg:grid-cols-${rows[2]} auto-rows-max auto-cols-max`}
    >
      {courses.map((e) => (
        <Course
          course={e}
          onSelection={onSelection}
          key={e.name}
          selected={selected.includes(e)}
        />
      ))}
    </div>
  );
};

export default Courses;

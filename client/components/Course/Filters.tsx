import { CourseInterface } from '../../interfaces/Courses';
import Button from '../Elements/Button';
import Filter from './Filter';

interface Props {
  onNewFilter: (value: string) => void;
  onClearFilter: () => void;
  courses: CourseInterface[];
  filter: string[];
}
const Filters = ({ onNewFilter, onClearFilter, courses, filter }: Props) => {
  const getAllOptionsForCourses = (allCourses: CourseInterface[]): string[] => {
    const mapped = allCourses.map((obj) => obj.credits[0]);
    return mapped
      .filter((item, index, arr) => arr.indexOf(item) === index)
      .sort((a, b) => {
        if (a === b) return 0;
        else if (a > b) return 1;
        else return -1;
      });
  };

  return (
    <div className="p-2 grid grid-flow-row gap-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
      {getAllOptionsForCourses(courses).map((e) => (
        <Filter
          filterName={e}
          filter={filter}
          onNewFilter={onNewFilter}
          key={e}
        />
      ))}
      {filter.length > 0 && (
        <Button
          onClick={onClearFilter}
          additionalCSS="font-semibold bg-red-600 text-white hover:bg-red-500"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default Filters;

import { CourseInterface } from '../../interfaces/Courses';
import Course from './Course';
import Fuse from 'fuse.js';

interface Props {
  courses: CourseInterface[];
  creditFilter: string[];
  onSelection: (course: CourseInterface) => void;
  selected: CourseInterface[];
  search: string;
}

const Courses = ({
  courses,
  creditFilter,
  onSelection,
  selected,
  search,
}: Props) => {
  const options = {
    includeScore: true,
    findAllMatches: true,
    threshold: 0.4,
    keys: ['name', 'credits', 'gradeReq', 'courseTier'],
  };

  /**
   *
   * @param coursesList {CourseInterface[]}
   * @param credit {string}
   * @param search {string}
   * @returns {CourseInterface[]}
   */
  const filterAndSortCourses = (
    coursesList: CourseInterface[],
    credit: string[],
    search: string,
  ): CourseInterface[] => {
    let newCourses: CourseInterface[];
    let searchedCourses: CourseInterface[];

    if (search !== '') {
      const fuse = new Fuse(courses, options);
      searchedCourses = fuse.search(search).map((e) => e.item);
      console.log(fuse.search(search));
    } else {
      searchedCourses = coursesList;
    }

    if (credit.length !== 0) {
      newCourses = searchedCourses.filter((a) => {
        for (const y of a.credits) {
          if (credit.includes(y)) return true;
        }
        return false;
      });
    } else {
      newCourses = searchedCourses;
    }

    return newCourses.sort((a, b) => {
      const courseACredit = a.credits[0],
        courseBCredit = b.credits[0];

      if (courseACredit === courseBCredit) return 0;
      else if (courseACredit > courseBCredit) return 1;
      else return -1;
    });
  };

  return (
    <div className="grid grid-flow-row gap-5 p-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 auto-rows-max auto-cols-max">
      {filterAndSortCourses(courses, creditFilter, search).map((e) => (
        <Course
          course={e}
          onSelection={onSelection}
          key={e.name}
          selected={selected}
        />
      ))}
    </div>
  );
};

export default Courses;

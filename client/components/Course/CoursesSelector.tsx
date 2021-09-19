import { CourseInterface } from '../../interfaces/Courses';
import Fuse from 'fuse.js';
import Courses from './Courses';
import { CoursesSize } from '../../interfaces/enums/CoursesSize';

interface Props {
  courses: CourseInterface[];
  creditFilter: string[];
  onSelection: (course: CourseInterface) => void;
  selected: CourseInterface[];
  search: string;
}

const CoursesSelector = ({
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
    <Courses
      onSelection={onSelection}
      selected={selected}
      courses={filterAndSortCourses(courses, creditFilter, search)}
      rows={CoursesSize.large}
    />
  );
};

export default CoursesSelector;

import { ReactElement } from 'react';
import { CourseInterface } from '../interfaces/Courses';
import Course from './Course';

interface Props {
  courses: CourseInterface[];
  creditFilter: string;
}

function Courses({ courses, creditFilter }: Props): ReactElement {
  const filterAndSortCourses = (
    coursesList: CourseInterface[],
    credit: string,
  ): CourseInterface[] => {
    let newCourses: CourseInterface[];

    if (credit !== 'All') {
      newCourses = coursesList.filter((a) => {
        for (const y of a.credits) {
          if (y === credit) return true;
        }
        return false;
      });
    } else {
      newCourses = coursesList;
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
      {filterAndSortCourses(courses, creditFilter).map((e) => (
        <Course course={e} />
      ))}
    </div>
  );
}

export default Courses;

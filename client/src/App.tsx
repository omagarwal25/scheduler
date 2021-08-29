import { ReactElement, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { CourseInterface } from './interfaces/Courses';
import axios, { AxiosResponse } from 'axios';
import Courses from './components/Courses';
import { getColor } from './services/getColor';

function App(): ReactElement {
  const [courses, setCourses] = useState<CourseInterface[]>(
    [] as CourseInterface[],
  );
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    const getGames = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          'http://localhost:8080/courses/',
        );
        setCourses(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getGames();
  }, []);

  const getAllOptionsForCourses = (allCoures: CourseInterface[]): string[] => {
    const mapped = allCoures.map((obj) => obj.credits[0]);
    mapped.push('All');
    return mapped
      .filter((item, index, arr) => arr.indexOf(item) === index)
      .sort((a, b) => {
        if (a === b) return 0;
        else if (a > b) return 1;
        else return -1;
      });
  };

  return (
    <div className="">
      <form className="grid grid-flow-row gap-5 p-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {getAllOptionsForCourses(courses).map((e) => (
          <label
            className={
              e === 'All'
                ? `p-2 rounded-md shadow-md bg-gradient-to-bl from-gray-900 to-black hover:from-gray-800 hover:to-black text-white`
                : `p-2 rounded-md shadow-md bg-gradient-to-bl from-${getColor(
                    e,
                  )}-50 to-${getColor(e)}-200 hover:from-${getColor(
                    e,
                  )}-100 hover:to-${getColor(e)}-300`
            }
            htmlFor={e}
          >
            <div>
              <input
                type="checkbox"
                className="w-4 h-4 p-2"
                value={e}
                id={e}
                checked={filter === e}
                onChange={(e) => setFilter(e.target.value)}
              />
              <label htmlFor={e} className="p-2">
                {e}
              </label>
            </div>
          </label>
        ))}
      </form>
      <Courses courses={courses} creditFilter={filter} />
    </div>
  );
}

export default App;

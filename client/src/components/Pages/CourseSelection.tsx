import { useState, useEffect } from 'react';
import { CourseInterface } from '../../interfaces/Courses';
import axios, { AxiosResponse } from 'axios';
import CoursesSelector from '../Course/CoursesSelector';
import Toolbar from '../Course/Toolbar';
import Filters from '../Course/Filters';
import { Schedule } from '../../interfaces/Schedule';
import { Redirect } from 'react-router';

const CourseSelection = () => {
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<string[]>([]);
  const [courses, setCourses] = useState<CourseInterface[]>(
    [] as CourseInterface[],
  );
  const [selected, setSelected] = useState<CourseInterface[]>([]);
  const [redirect, setRedirect] = useState<string | null>(null);

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

  const getClasses = async () => {
    if (selected.length > 0) {
      const data = selected.map((e) => e.name);
      try {
        const res: AxiosResponse = await axios.post(
          'http://localhost:8080/scheduler/',
          data,
          { withCredentials: true },
        );

        const resData: Schedule = res.data;

        setRedirect(resData._id);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('You must select at least one class');
    }
  };

  const toggleSelected = (course: CourseInterface) => {
    if (!selected.includes(course)) {
      setSelected([...selected, course]);
    } else {
      setSelected(selected.filter((a) => a !== course));
    }
  };

  const handleNewFilter = (value: string) => {
    if (filter.includes(value)) {
      setFilter(filter.filter((e) => e !== value));
    } else {
      setFilter([...filter, value]);
    }
  };

  const clearFilter = () => {
    setFilter([]);
  };

  const handleNewSearch = (value: string) => setSearch(value);

  const clearSelections = () => setSelected([]);

  return (
    <div className="grid grid-flow-row grid-cols-1">
      <Filters
        onNewFilter={handleNewFilter}
        onClearFilter={clearFilter}
        filter={filter}
        courses={courses}
      />
      <Toolbar
        onNewSearch={handleNewSearch}
        onGo={getClasses}
        clearSelections={clearSelections}
        selected={selected}
        search={search}
        courses={courses}
      />
      <CoursesSelector
        courses={courses}
        creditFilter={filter}
        onSelection={toggleSelected}
        selected={selected}
        search={search}
      />
      {redirect !== null && <Redirect push to={`/schedule/${redirect}`} />}
    </div>
  );
};

export default CourseSelection;

import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { Schedule } from '../../interfaces/Schedule';
import axios, { AxiosResponse } from 'axios';
import Course from '../Course/Course';
import Courses from '../Course/Courses';

interface urlParams {
  scheduleId: string;
}

const Results = () => {
  const [schedule, setSchedule] = useState<Schedule>({} as Schedule);
  const [valid, setValid] = useState<boolean>(false);
  const { scheduleId } = useParams<urlParams>();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `http://localhost:8080/scheduler/${scheduleId}`,
          { withCredentials: true },
        );
        setSchedule(response.data);
        console.log(response.data);
        setValid(true);
      } catch (error) {
        setValid(false);
      }
    };
    fetchSchedule();
  }, [scheduleId]);

  return (
    <div className="grid grid-flow-row grid-cols-1 p-2">
      {!valid ? (
        <h1 className="text-red-500">Unauthorized User</h1>
      ) : (
        <>
          <h1>Grade 9</h1>
          <Courses
            courses={schedule.gradeNine}
            onSelection={() => {}}
            selected={[]}
            rows={[1, 2, 4]}
          />
          <h1>Grade 10</h1>
          <Courses
            courses={schedule.gradeTen}
            onSelection={() => {}}
            selected={[]}
            rows={[1, 2, 4]}
          />
          <h1>Grade 11</h1>
          <Courses
            courses={schedule.gradeEleven}
            onSelection={() => {}}
            selected={[]}
            rows={[1, 2, 4]}
          />
          <h1>Grade 12</h1>
          <Courses
            courses={schedule.gradeTwelve}
            onSelection={() => {}}
            selected={[]}
            rows={[1, 2, 4]}
          />
        </>
      )}
    </div>
  );
};

export default Results;

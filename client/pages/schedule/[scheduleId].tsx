import { useState, useEffect } from 'react';
import { Schedule } from '../../interfaces/Schedule';
import axios, { AxiosResponse } from 'axios';
import Courses from '../../components/Course/Courses';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { CoursesSize } from '../../enums/CoursesSize';

const Results = () => {
  const [schedule, setSchedule] = useState<Schedule>({} as Schedule);
  const [valid, setValid] = useState<boolean>(false);

  const router = useRouter();
  const { scheduleId } = router.query;
  const { data: session } = useSession();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `http://localhost:8080/scheduler/${scheduleId}`,
          { headers: { Authorization: `Bearer ${session?.accessToken}` } },
        );
        setSchedule(response.data);
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
            rows={CoursesSize.medium}
          />
          <h1>Grade 10</h1>
          <Courses
            courses={schedule.gradeTen}
            onSelection={() => {}}
            selected={[]}
            rows={CoursesSize.medium}
          />
          <h1>Grade 11</h1>
          <Courses
            courses={schedule.gradeEleven}
            onSelection={() => {}}
            selected={[]}
            rows={CoursesSize.medium}
          />
          <h1>Grade 12</h1>
          <Courses
            courses={schedule.gradeTwelve}
            onSelection={() => {}}
            selected={[]}
            rows={CoursesSize.medium}
          />
        </>
      )}
    </div>
  );
};

export default Results;

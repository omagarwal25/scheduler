import { useState, useEffect } from 'react';
import { Schedule } from '../../interfaces/Schedule';
import axios, { AxiosResponse } from 'axios';
import Courses from '../../components/Course/Courses';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { CoursesSize } from '../../interfaces/enums/CoursesSize';
import { CourseInterface } from '../../interfaces/Courses';

interface year {
  name: string;
  courses: CourseInterface[];
}

const Results = () => {
  const [schedule, setSchedule] = useState<Schedule>({} as Schedule);
  const [valid, setValid] = useState<boolean>(false);
  const [years, setYears] = useState<year[]>({} as year[]);

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
        const schedule: Schedule = response.data;
        setSchedule(schedule);
        setYears([
          { name: 'Grade 9', courses: schedule.gradeNine },
          { name: 'Grade 10', courses: schedule.gradeTen },
          { name: 'Grade 11', courses: schedule.gradeEleven },
          { name: 'Grade 12', courses: schedule.gradeTwelve },
        ]);
        setValid(true);
      } catch (error) {
        setValid(false);
      }
    };
    fetchSchedule();
  }, [scheduleId]);

  const sort = (list: CourseInterface[]) =>
    list.sort((a, b) => {
      const courseACredit = a.credits[0],
        courseBCredit = b.credits[0];

      if (courseACredit === courseBCredit) return 0;
      else if (courseACredit > courseBCredit) return 1;
      else return -1;
    });

  return (
    <div className="p-2 grid grid-flow-row grid-cols-1">
      {!valid ? (
        <h1 className="text-red-500">Unauthorized User</h1>
      ) : (
        years.map((y) => (
          <>
            <h1>{y.name}</h1>
            <Courses
              courses={sort(y.courses)}
              onSelection={() => {}}
              selected={[]}
              rows={CoursesSize.medium}
            />
          </>
        ))
      )}
    </div>
  );
};

export default Results;

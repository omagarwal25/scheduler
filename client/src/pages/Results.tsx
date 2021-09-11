import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import { Schedule } from '../interfaces/Schedule';
import axios, { AxiosResponse } from 'axios';

interface urlParams {
  scheduleId: string;
}

const Results = () => {
  const [schedule, setSchedule] = useState<Schedule>();
  const [valid, setValid] = useState<boolean>(false);
  const handleToggleShowCourses = () => {};
  const { scheduleId } = useParams<urlParams>();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `http://localhost:8080/scheduler/${scheduleId}`,
          { withCredentials: true },
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
    <div className="grid grid-flow-row grid-cols-1">
      <Button
        onClick={handleToggleShowCourses}
        additionalCSS="m-2 w-auto text-white bg-red-600 m-2"
      >
        {scheduleId}
      </Button>
      {!valid ? <h1>Invalid User</h1> : <h1>{schedule?.gradeNine}</h1>}
    </div>
  );
};

export default Results;

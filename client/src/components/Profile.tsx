import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Schedule } from '../interfaces/Schedule';
import { Link } from 'react-router-dom';
import moment from 'moment';

interface Props {}

const Profile = (props: Props) => {
  const [schedules, setSchedules] = useState<Schedule[]>();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          'http://localhost:8080/scheduler/user',
          { withCredentials: true },
        );

        setSchedules(response.data);
      } catch (error) {}
    };
    fetchSchedule();
  }, []);
  return (
    <div>
      {schedules?.map((e) => (
        <div className="p-2 m-2 bg-gray-300 rounded-md w-max hover:bg-gray-400">
          <Link to={`/schedule/${e._id}`}>{`${moment(e.createdAt).format(
            'MMMM Do YYYY',
          )}'s Schedule`}</Link>
        </div>
      ))}
    </div>
  );
};

export default Profile;

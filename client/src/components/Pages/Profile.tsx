import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Schedule } from '../../interfaces/Schedule';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Button from '../Elements/Button';

interface Props {
  onLogout: () => void;
}

const Profile = ({ onLogout }: Props) => {
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
    <div className="">
      {schedules?.map((e) => (
        <div className="p-2 m-2 bg-gray-300 rounded-md w-max hover:bg-gray-400">
          <Link to={`/schedule/${e._id}`}>{`${moment(e.createdAt).format(
            'MMMM Do YYYY',
          )} at ${moment(e.createdAt).format('MM:HH')}`}</Link>
        </div>
      ))}
      <Button
        onClick={onLogout}
        additionalCSS="m-2 bg-red-500 hover:bg-red-600"
      >
        Log Out
      </Button>
    </div>
  );
};

export default Profile;

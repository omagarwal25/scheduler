import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Schedule } from '../interfaces/Schedule';
import Button from '../components/Elements/Button';
import { signIn, signOut, useSession } from 'next-auth/react';
import router from 'next/router';
import LinkToSchedule from '../components/Nav/LinkToSchedule';

interface Props {
  onLogout: () => void;
}

const Profile = ({ onLogout }: Props) => {
  const [schedules, setSchedules] = useState<Schedule[]>();

  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(status);
    if (status !== 'loading') {
      if (status === 'unauthenticated') signIn();
      else {
        const fetchSchedule = async () => {
          try {
            const response: AxiosResponse = await axios.get(
              'http://localhost:8080/scheduler/user',
              { headers: { Authorization: `Bearer ${session?.accessToken}` } },
            );

            setSchedules(response.data);
          } catch (error) {}
        };
        fetchSchedule();
      }
    }
  }, [status]);

  return (
    <div className="">
      {schedules?.map((e) => (
        <LinkToSchedule schedule={e} />
      ))}
      {/* {<Button
        onClick={() => {
          signOut();
          router.push('/');
        }}
        additionalCSS="m-2 bg-red-500 hover:bg-red-600"
      >
        Log Out
      </Button>} */}
    </div>
  );
};

export default Profile;

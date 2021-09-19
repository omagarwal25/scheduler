import NavBar from './NavBar';
import NavButton from './NavButton';

import { useSession, signIn, signOut } from 'next-auth/react';

import { Size } from '../../enums/Size';

interface Props {
  onSidebar: () => void;
}

const NavSide = ({ onSidebar }: Props) => {
  const { data: session } = useSession();

  const handleLogout = () => signOut();
  const handleLogin = () => signIn();

  return (
    <div className="h-full bg-white w-max">
      <NavBar onSidebar={onSidebar} size={Size.SHORT} />
      <NavButton
        svg={
          <img src="/svgs/house.svg" width="20" height="20" className="m-1" />
        }
        link="/"
        text="Home"
      />
      <NavButton
        svg={
          <img
            src="/svgs/calendar.svg"
            width="20"
            height="20"
            className="m-1"
          />
        }
        link="/CourseSelection"
        text="Create a schedule"
      />
      <NavButton
        svg={
          <img src="/svgs/user.svg" width="20" height="20" className="m-1" />
        }
        link="/Profile"
        text="Profile"
      />
      {session ? (
        <div
          className="flex p-2 text-red-400 hover:bg-gray-100"
          onClick={handleLogout}
        >
          Log out
        </div>
      ) : (
        <div
          className="flex p-2 text-blue-400 hover:bg-gray-100"
          onClick={handleLogin}
        >
          Log In
        </div>
      )}
    </div>
  );
};

export default NavSide;

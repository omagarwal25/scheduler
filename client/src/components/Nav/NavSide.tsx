import NavBar from './NavBar';
import NavButton from './NavButton';

import { ReactComponent as HouseSvg } from '../../svgs/house.svg';
import { ReactComponent as CalendarSvg } from '../../svgs/calendar.svg';
import { ReactComponent as UserSvg } from '../../svgs/user.svg';
import { Size } from '../../enums/Size';

interface Props {
  loggedIn: boolean;
  onSidebar: () => void;
  onLogout: () => void;
}

const NavSide = ({ loggedIn, onSidebar, onLogout }: Props) => {
  return (
    <div className="h-full bg-white w-max">
      <NavBar loggedIn={loggedIn} onSidebar={onSidebar} size={Size.SHORT} />
      <NavButton
        svg={<HouseSvg width="20" height="20" className="m-1" />}
        link="/"
        text="Home"
      />
      <NavButton
        svg={<CalendarSvg width="20" height="20" className="m-1" />}
        link="/courseSelection"
        text="Create a schedule"
      />
      <NavButton
        svg={<UserSvg width="20" height="20" className="m-1" />}
        link="/user"
        text="Profile"
      />
      {loggedIn && (
        <div
          className="flex p-2 text-red-400 hover:bg-gray-100"
          onClick={onLogout}
        >
          Log out
        </div>
      )}
    </div>
  );
};

export default NavSide;

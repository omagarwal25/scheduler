import { Size } from '../../enums/Size';
import { ReactComponent as HamburgerSvg } from '../../svgs/hamburger.svg';

interface Props {
  loggedIn: boolean;
  onSidebar: () => void;
  size: Size;
}

const NavBar = ({ loggedIn, onSidebar, size }: Props) => {
  return (
    <div className="flex items-center justify-start h-12 p-2 bg-gradient-to-l from-yellow-200 to-yellow-300">
      <HamburgerSvg onClick={onSidebar} width="20" height="20" />
      <h1 className="m-2 font-extralight">Scheduler</h1>
      {size && <></>}
    </div>
  );
};

export default NavBar;

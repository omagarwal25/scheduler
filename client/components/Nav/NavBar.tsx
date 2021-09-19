import { Size } from '../../interfaces/enums/Size';

interface Props {
  onSidebar: () => void;
  size: Size;
}

const NavBar = ({ onSidebar, size }: Props) => {
  return (
    <div className="flex items-center justify-start h-12 p-2 bg-gradient-to-l from-yellow-200 to-yellow-300">
      <img
        src="/svgs/hamburger.svg"
        onClick={onSidebar}
        width="20"
        height="20"
      />
      <h1 className="m-2 font-extralight">Scheduler</h1>
      {size && <></>}
    </div>
  );
};

export default NavBar;

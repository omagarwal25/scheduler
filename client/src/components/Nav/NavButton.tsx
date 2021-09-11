import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  link: string;
  svg: ReactNode;
  text: string;
}

const NavButton = ({ link, svg, text }: Props) => {
  return (
    <div className="flex p-2 hover:bg-gray-100">
      {svg}
      <NavLink to={link} className="m-1 ">
        {text}
      </NavLink>
    </div>
  );
};

export default NavButton;

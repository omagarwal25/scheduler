import { ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  link: string;
  svg: ReactNode;
  text: string;
}

const NavButton = ({ link, svg, text }: Props) => {
  return (
    <div className="flex p-2 hover:bg-gray-100">
      {svg}
      <Link href={link}>
        <a className="m-1">{text}</a>
      </Link>
    </div>
  );
};

export default NavButton;

import { ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  link: string;
  svg: ReactNode;
  text: string;
}

const NavButton = ({ link, svg, text }: Props) => {
  return (
    <Link href={link}>
      <div className="flex p-2 cursor-pointer hover:bg-gray-100">
        {svg}

        <a className="m-1">{text}</a>
      </div>
    </Link>
  );
};

export default NavButton;

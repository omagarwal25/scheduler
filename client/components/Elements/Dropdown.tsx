import { useState } from 'react';
import { getColor } from '../../lib/getColor';
import DropdownChild from './DropdownChild';

interface Props {
  handleSelection: (value: string) => void;
  selected: string;
  options: string[];
  classColor: string;
}

const Dropdown = ({
  handleSelection,
  selected,
  options,
  classColor,
}: Props) => {
  const [dropdown, setDropdown] = useState<boolean>(false);

  return (
    <div
      className={`z-20 grid m-2 w-1/2 h-max grid-flow-row grid-cols-1 transition-all ease-in-out transform duration-300 cursor-pointer shadow-md ${getColor(
        classColor,
        false,
      )}`}
    >
      <div
        className="flex flex-row items-center p-1"
        onClick={() => setDropdown(!dropdown)}
      >
        <img
          className={`${
            dropdown ? 'rotate-0' : '-rotate-90'
          } cursor-pointer transform transition-all duration-300`}
          src="/svgs/caret.svg"
          width="20"
          height="20"
        />
        {!dropdown && <h1 className="ml-1">{selected}</h1>}
      </div>
      <div className="relative z-20">
        {dropdown &&
          options.map((e) => (
            <DropdownChild onClick={() => handleSelection(e)} value={e} />
          ))}
      </div>
    </div>
  );
};

export default Dropdown;

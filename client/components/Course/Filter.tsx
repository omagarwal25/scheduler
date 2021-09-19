import { getColor } from '../services/getColor';

interface Props {
  filterName: string;
  filter: string[];
  onNewFilter: (value: string) => void;
}

const Filter = ({ filterName, filter, onNewFilter }: Props) => {
  return (
    <label
      className={`cursor-pointer p-2 rounded-md shadow-md bg-gradient-to-bl ${getColor(
        filterName,
        false,
      )}`}
      htmlFor={filterName}
    >
      <div>
        <input
          type="checkbox"
          className="w-4 h-4 p-2"
          value={filterName}
          id={filterName}
          checked={filter.includes(filterName)}
          onChange={(e) => onNewFilter(e.target.value)}
        />
        <label htmlFor={filterName} className="p-2">
          {filterName}
        </label>
      </div>
    </label>
  );
};

export default Filter;

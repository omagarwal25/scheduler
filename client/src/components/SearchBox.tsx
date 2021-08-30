import { ReactComponent as SearchSvg } from '../search.svg';
interface Props {
  onNewSearch: (value: string) => void;
}

const SearchBox = ({ onNewSearch }: Props) => {
  return (
    <div className="flex flex-row p-2 m-2 rounded-md shadow-md w-min">
      <SearchSvg />
      <input
        className="w-max focus:border-transparent focus:outline-none"
        type="search"
        onChange={(e) => onNewSearch(e.target.value)}
        placeholder="Search for Classes"
      />
    </div>
  );
};

export default SearchBox;

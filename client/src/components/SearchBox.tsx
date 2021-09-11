import { ReactComponent as SearchSvg } from '../svgs/search.svg';
import { ReactComponent as CloseSvg } from '../svgs/close.svg';
interface Props {
  onNewSearch: (value: string) => void;
  search: string;
}

const SearchBox = ({ onNewSearch, search }: Props) => {
  return (
    <div className="flex flex-row flex-wrap w-1/4 p-2 m-2 rounded-md shadow-md">
      <SearchSvg />
      <input
        className="flex-grow w-auto focus:border-transparent focus:outline-none"
        type="search"
        onChange={(e) => onNewSearch(e.target.value)}
        placeholder="Search for Classes"
        value={search}
      />
      {search !== '' && (
        <div
          title="Clear Search"
          className="order-last cursor-pointer"
          onClick={() => onNewSearch('')}
        >
          <CloseSvg />
        </div>
      )}
    </div>
  );
};

export default SearchBox;

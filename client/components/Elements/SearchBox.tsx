interface Props {
  onNewSearch: (value: string) => void;
  search: string;
}

const SearchBox = ({ onNewSearch, search }: Props) => {
  return (
    <div className="flex flex-row flex-wrap p-2 m-2 rounded-md shadow-md md:w-1/4 lg:w-1/4">
      <img src="/svgs/search.svg" width="15" height="15" className="mr-2" />
      <input
        className="flex-grow w-auto focus:border-transparent focus:outline-none"
        type="search"
        onChange={(e) => onNewSearch(e.target.value)}
        placeholder="Search for Classes"
        value={search}
      />
      {search && (
        <img
          title="Clear Search"
          className="order-last cursor-pointer"
          src="/svgs/close.svg"
          width="15"
          height="15"
          onClick={() => onNewSearch('')}
        />
      )}
    </div>
  );
};

export default SearchBox;

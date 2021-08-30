interface Props {
  onNewSearch: (value: string) => void;
}

const SearchBox = ({ onNewSearch }: Props) => {
  return (
    <div className="flex flex-row p-2 m-2 rounded-md shadow-md w-min">
      <svg
        className="w-4 h-4 m-1 text-gray-600"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
      </svg>
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

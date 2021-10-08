import { AlreadyTaken } from '../../interfaces/AlreadyTaken';
import { CourseInterface } from '../../interfaces/Courses';
import Button from '../Elements/Button';
import Dropdown from '../Elements/Dropdown';
import SearchBox from '../Elements/SearchBox';

interface Props {
  onNewSearch: (value: string) => void;
  onGo: () => Promise<void>;
  clearSelections: () => void;
  selected: CourseInterface[];
  search: string;
  alreadyTaken: AlreadyTaken;
  handleAlreadyTaken: (value: AlreadyTaken) => void;
}

const Toolbar = ({
  onNewSearch,
  onGo,
  clearSelections,
  selected,
  search,
  alreadyTaken,
  handleAlreadyTaken,
}: Props) => {
  const handleSetLanguage = (value: string) =>
    handleAlreadyTaken({ ...alreadyTaken, language: value });

  const handleSetMath = (value: string) =>
    handleAlreadyTaken({ ...alreadyTaken, math: value });

  return (
    <div className="md:flex md:flex-row lg:flex lg:flex-row sm:block">
      <SearchBox onNewSearch={onNewSearch} search={search} />
      <Button
        onClick={onGo}
        additionalCSS="w-auto text-white bg-green-700 m-2 hover:bg-green-600"
        title="Generate Your High School Schedule"
      >
        Generate Schedule 📗
      </Button>
      <div className="block md:flex md:w-1/4 lg:flex lg:w-1/4">
        <Dropdown
          key="Language"
          handleSelection={handleSetLanguage}
          selected={alreadyTaken.language}
          options={['Spanish 1']}
          classColor="World Language"
        />
        <Dropdown
          key="Math"
          handleSelection={handleSetMath}
          classColor="Math"
          selected={alreadyTaken.math}
          options={['Algebra 1', 'Math 8']}
        />
      </div>
      {selected.length > 0 && (
        <Button
          additionalCSS="w-auto text-white bg-red-600 m-2 hover:bg-red-500"
          onClick={clearSelections}
        >
          Clear Selections
        </Button>
      )}
    </div>
  );
};

export default Toolbar;

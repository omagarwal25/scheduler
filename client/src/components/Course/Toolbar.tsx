import { CourseInterface } from '../../interfaces/Courses';
import Button from '../Elements/Button';
import SearchBox from '../Elements/SearchBox';

interface Props {
  onNewSearch: (value: string) => void;
  onGo: () => Promise<void>;
  clearSelections: () => void;
  selected: CourseInterface[];
  search: string;
}

const Toolbar = ({
  onNewSearch,
  onGo,
  clearSelections,
  selected,
  search,
}: Props) => {
  return (
    <div className="flex flex-row">
      <SearchBox onNewSearch={onNewSearch} search={search} />
      <Button
        onClick={onGo}
        additionalCSS="w-auto text-white bg-green-700 m-2 hover:bg-green-600"
        title="Generate Your High School Schedule"
      >
        Generate Schedule 📗
      </Button>
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

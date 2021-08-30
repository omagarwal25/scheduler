import { CourseInterface } from '../interfaces/Courses';
import Button from './Button';
import SearchBox from './SearchBox';

interface Props {
  onNewSearch: (value: string) => void;
  onGo: () => Promise<void>;
  clearSelections: () => void;
  selected: CourseInterface[];
}

const Toolbar = ({ onNewSearch, onGo, clearSelections, selected }: Props) => {
  return (
    <div className="flex flex-row">
      <SearchBox onNewSearch={onNewSearch} />
      <Button
        onClick={onGo}
        additionalCSS="w-auto text-white bg-green-700 m-2"
        text="Generate Schedule 📗"
      />
      {selected.length > 0 && (
        <Button
          additionalCSS="w-auto text-white bg-red-600 m-2"
          onClick={clearSelections}
          text="Clear Selections"
        />
      )}
    </div>
  );
};

export default Toolbar;

import { ReactElement } from 'react';
import Button from '../components/Button';

interface Props {}

function Results({}: Props): ReactElement {
  const handleToggleShowCourses = () => {};

  return (
    <Button
      onClick={handleToggleShowCourses}
      additionalCSS="m-2 w-auto text-white bg-red-600 m-2"
    >
      Go Back
    </Button>
  );
}

export default Results;

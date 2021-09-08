import { ReactElement } from 'react';
import { useParams } from 'react-router';
import Button from '../components/Button';

interface urlParams {
  scheduleId: string;
}

const Results = () => {
  const handleToggleShowCourses = () => {};
  const { scheduleId } = useParams<urlParams>();

  return (
    <Button
      onClick={handleToggleShowCourses}
      additionalCSS="m-2 w-auto text-white bg-red-600 m-2"
    >
      {scheduleId}
    </Button>
  );
};

export default Results;

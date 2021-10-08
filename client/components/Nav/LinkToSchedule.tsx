import { CourseInterface } from '../../interfaces/Courses';
import Link from 'next/link';
import moment from 'moment';
import { Schedule } from '../../interfaces/Schedule';

interface Props {
  schedule: Schedule;
}

const LinkToSchedule = ({ schedule }: Props) => {
  return (
    <div className="p-2 m-2 transition duration-300 ease-in-out transform bg-gray-300 rounded-md cursor-pointer w-max hover:bg-gray-400">
      <Link href={`/schedule/${schedule._id}`}>
        <a>{`${moment(schedule.createdAt).format('MMMM Do YYYY')} at ${moment(
          schedule.createdAt,
        ).format('MM:HH')}`}</a>
      </Link>
    </div>
  );
};

export default LinkToSchedule;

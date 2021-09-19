interface Props {
  semester: string;
}

const Semester = ({ semester }: Props) => {
  return (
    <h1 className="italic">
      {semester === 'SEMESTER_ONE'
        ? 'Semester One'
        : semester === 'SEMESTER_TWO'
        ? 'Semester Two'
        : semester === 'WHOLE_YEAR'
        ? 'Full Year'
        : 'Half Year'}
    </h1>
  );
};

export default Semester;

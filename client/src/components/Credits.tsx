interface Props {
  credits: string[];
}

const Credits = ({ credits }: Props) => {
  return (
    <div>
      <h2 className="font-semibold">
        {`Credit${credits.length > 1 ? 's:' : ':'}`}
      </h2>
      {credits.map((e) => (
        <h2 className="italic">{e}</h2>
      ))}
    </div>
  );
};

export default Credits;

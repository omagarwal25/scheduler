import { ReactElement } from 'react';

interface Props {
  credits: string[];
}

function Credits({ credits }: Props): ReactElement {
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
}

export default Credits;

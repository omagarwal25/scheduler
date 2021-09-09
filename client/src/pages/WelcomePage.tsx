import { useState } from 'react';

interface Props {}

const WelcomePage = ({}: Props) => {
  const [user, setUser] = useState<string | null>(null);

  return <div></div>;
};

export default WelcomePage;

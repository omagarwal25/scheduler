import { useState } from 'react';
import Button from '../Elements/Button';
import Login from './Login';
import Register from './Register';

interface Props {
  onLogin: (value: boolean) => void;
}

const LoginInterface = ({ onLogin }: Props) => {
  const [loginTab, setLoginTab] = useState<boolean>(true);

  const handleChangeLogin = (value: boolean) => setLoginTab(value);

  return (
    <div className="flex flex-col items-center justify-center p-10 justify-items-center">
      <div className="p-2 rounded-md shadow-md lg:w-1/4 h-1/4 md:w-1/2 sm:w-10/12">
        <div className="grid grid-flow-col">
          <Button
            additionalCSS={`bg-gradient-to-bl ${
              loginTab
                ? 'hover:to-gray-100 hover:from-white to-gray-300 from-gray-200 m-2'
                : 'to-gray-100 from-white hover:to-gray-300 hover:from-gray-200 m-2'
            }`}
            onClick={() => handleChangeLogin(true)}
          >
            Log In
          </Button>
          <Button
            additionalCSS={`bg-gradient-to-bl ${
              !loginTab
                ? 'hover:to-gray-100 hover:from-white to-gray-300 from-gray-200 m-2'
                : 'to-gray-100 from-white hover:to-gray-300 hover:from-gray-200 m-2'
            }`}
            onClick={() => handleChangeLogin(false)}
          >
            Register
          </Button>
        </div>
        {loginTab ? (
          <Login onLogin={onLogin} />
        ) : (
          <Register onLogin={onLogin} />
        )}
      </div>
    </div>
  );
};

export default LoginInterface;

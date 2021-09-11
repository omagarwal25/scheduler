import { useState } from 'react';
import { LoginError } from '../../enums/LoginError';
import axios from 'axios';
import { Redirect } from 'react-router';
interface Props {
  onLogin: (value: boolean) => void;
}

const Login = ({ onLogin }: Props) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [status, setStatus] = useState<LoginError>(LoginError.NOERRR);

  const onSubmit = async () => {
    if (email === '' || password === '') {
      setStatus(LoginError.EMPTY);
    } else {
      const res = await axios.post(
        'http://localhost:8080/auth/login',
        {
          password: password,
          email: email,
        },
        {
          withCredentials: true,
          validateStatus: (status) => {
            return status === 200 || status === 401;
          },
        },
      );

      if (res.status === 401) {
        setStatus(LoginError.USERNOTVALID);
      } else {
        onLogin(true);
        setStatus(LoginError.SUCCESS);
      }
    }
  };

  return (
    <div>
      <form className="flex flex-col">
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          placeholder="email"
          className="p-2 m-1 rounded-md shadow-md"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          placeholder="password"
          className="p-2 m-1 rounded-md shadow-md"
        />
        {status !== LoginError.SUCCESS ? (
          <h1 className="p-1 m-1 text-red-400">{status}</h1>
        ) : (
          <Redirect push to="/user" />
        )}
        <input
          type="button"
          className="p-2 m-1 rounded-md shadow-md hover:shadow-none"
          onClick={onSubmit}
          value="Submit"
        />
      </form>

      {
        // add forgot password
      }
    </div>
  );
};

export default Login;

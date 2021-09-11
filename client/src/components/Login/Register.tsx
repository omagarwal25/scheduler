import { Redirect } from 'react-router';
import { useState } from 'react';
import { LoginError } from '../../enums/LoginError';
import axios from 'axios';

interface Props {
  onLogin: (value: boolean) => void;
}

const Register = ({ onLogin }: Props) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [status, setStatus] = useState<LoginError>(LoginError.NOERRR);

  const onSubmit = async () => {
    if (email === '' || password === '' || username === '')
      setStatus(LoginError.EMPTY);
    else if (password !== confirmPassword) setStatus(LoginError.PASSNOMATCH);
    else {
      const res = await axios.post(
        'http://localhost:8080/users',
        {
          password: password,
          username: username,
          email: email,
        },
        {
          withCredentials: true,
          validateStatus: (status) => {
            return (
              status === 200 ||
              status === 401 ||
              status === 201 ||
              status === 400
            );
          },
        },
      );

      if (res.status !== 201) {
        console.log(res.data);
        if (
          res.data.message ===
          'Duplicate User, email address already exists in system.'
        )
          setStatus(LoginError.DUPLICATE);
        else if (res.data.message[0] === 'email must be an email')
          setStatus(LoginError.EMAILINVALID);
      } else {
        const auth = await axios.post(
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

        if (auth.status === 401) {
          setStatus(LoginError.USERNOTVALID);
        } else {
          onLogin(true);
          setStatus(LoginError.SUCCESS);
        }
      }
    }
  };

  return (
    <div>
      <form className="flex flex-col">
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          placeholder="username"
          className="p-2 m-1 rounded-md shadow-md"
        />
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
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          name="confirm password"
          placeholder="confirm password"
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

export default Register;

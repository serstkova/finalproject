import { SyntheticEvent, ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mountain from './../../mountain.jpg'

import { Routes } from 'constants/routes';
import { ErrorBlock } from 'components/ErrorBlock';
import { useUserContext } from 'context/UserContext';
import { InputField } from 'components/InputField';

import './login-style.scss';

const initialFormValues = {
  username: '',
  password: '',
} as const;

export const Login = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] =
    useState<typeof initialFormValues>(initialFormValues);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { signIn, isLoading } = useUserContext();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    signIn({
      username: formValues.username,
      password: formValues.password,
      onSuccess: () => navigate(Routes.Root),
      onError: () => setErrorMessage('There was an error signing in'),
    });
  };

  const hasFormValues = Object.values(formValues).every(Boolean);

  return (
    <div className="login-page" style={{backgroundImage:`url(${mountain})`}}>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="text-center">Password Health</h1>
        <InputField
          value={formValues.username}
          onChange={handleInputChange}
          placeholder="Username"
          type="text"
          name="username"
          className="input mt-52px"
        />
        <InputField
          value={formValues.password}
          onChange={handleInputChange}
          placeholder="Password"
          type="password"
          name="password"
          className="input mt-24px"
        />
        <div className="mt-12px">
          <ErrorBlock error={errorMessage} />
        </div>
        <button
          data-testid="loginButton"
          type="submit"
          className="button mt-24px"
          disabled={!hasFormValues || isLoading}
        >
          {isLoading ? <div className="spinner"></div> : <span>Login</span>}
        </button>
      </form>
    </div>
  );
};

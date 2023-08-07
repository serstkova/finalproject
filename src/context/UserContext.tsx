import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { login } from 'services/login';
import { IUserContext, SignInParams } from './types';
import { getUser } from 'services/user';
import { TOKEN_KEY, getToken } from 'constants/auth';
import { UserDTO } from '../../types';

const initialUser: IUserContext['user'] = {
  id: '',
  email: '',
  username: '',
};

const UserContext = createContext<IUserContext>({
  user: initialUser,
  userToken: '',
  isLoading: false,
  errorMessage: '',
  signIn: () => null,
  logout: () => null,
  updateUser: () => null,
  deleteData: () => null,
});

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('UserContext must be used within a provider');
  }
  return context;
};

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserDTO>(initialUser);
  const [userToken, setUserToken] = useState<string>('');

  const signIn = useCallback(
    async ({ username, password, onSuccess, onError }: SignInParams) => {
      setIsLoading(true);
      try {
        const token = await login(username, password);
        localStorage.setItem(TOKEN_KEY, token);
        setUserToken(token);
        onSuccess();
      } catch (error) {
        onError();
        console.error('Error while logging in: ' + error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateUser = useCallback(async () => {
    setErrorMessage('');
    setIsLoading(true);

    try {
      const data = await getUser();
      setUser(data);
    } catch (error) {
      setErrorMessage((error as any).message);
      localStorage.removeItem(TOKEN_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteData = () => {
    setErrorMessage('');
    setIsLoading(false);
    setUser(initialUser);
    setUserToken('');
  };

  const logout = (callback: () => void) => {
    localStorage.removeItem(TOKEN_KEY);
    deleteData();
    callback();
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      updateUser();
    }
  }, [userToken,updateUser]);

  const value = {
    updateUser,
    deleteData,
    errorMessage,
    isLoading,
    user,
    logout,
    signIn,
    userToken: getToken(),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

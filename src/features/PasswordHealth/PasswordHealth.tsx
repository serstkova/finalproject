import { Outlet } from 'react-router-dom';

import { ErrorBlock } from 'components/ErrorBlock';
import { LoadingScreen } from 'components/LoadingScreen';
import { Header } from './components/Header/Header';
import { useUserContext } from 'context/UserContext';

export const PasswordHealth = () => {
  const {
    errorMessage: userProviderErrorMessage,
    isLoading: userDataIsLoading,
  } = useUserContext();

  if (userDataIsLoading) {
    return <LoadingScreen />;
  }

  if (userProviderErrorMessage) {
    return <ErrorBlock error={userProviderErrorMessage} />;
  }

  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
};

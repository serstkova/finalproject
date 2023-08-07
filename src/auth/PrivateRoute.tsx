import { Navigate, Outlet } from 'react-router-dom';

import { Routes } from 'constants/routes';
import { useUserContext } from 'context/UserContext';

export const PrivateRoute = () => {
  const { userToken } = useUserContext();

  return userToken ? <Outlet /> : <Navigate to={Routes.Login} />;
};

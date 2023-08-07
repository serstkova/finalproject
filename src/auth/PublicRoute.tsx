import { Navigate, Outlet } from 'react-router-dom';

import { Routes } from 'constants/routes';
import { useUserContext } from 'context/UserContext';

export const PublicRoute = () => {
  const { userToken } = useUserContext();

  return userToken ? <Navigate to={Routes.Root} /> : <Outlet />;
};

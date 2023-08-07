import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface RedirectProps {
  from: string;
  to: string;
}

export const RedirectRoute = ({ from, to }: RedirectProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === from) {
      navigate(to);
    }
  }, [from, to,pathname,navigate]);

  return <></>;
};

export const renderRouteElement = (path: string, RouteComponent:any, redirectTo?:string) => {
  if (redirectTo) {
    return <RedirectRoute from={path} to={redirectTo} />;
  }
  return <RouteComponent />;
};

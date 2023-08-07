import { PasswordHealth } from 'features/PasswordHealth/PasswordHealth';
import { Routes } from 'constants/routes';
import { Login } from 'features/Login';


type TOutlet = {
  path: string;
  Component: React.FunctionComponent;
};

export type TRouterConfig = TOutlet & {
  index?: boolean;
  redirectTo?: string;
  outlets?: TOutlet[];
};

export const publicRouteConfig: TRouterConfig[] = [
  {
    index: true,
    path: Routes.Login,
    Component: Login,
  },
];

export const privateRouteConfig: Array<TRouterConfig> = [
  {
    path: Routes.Root,
    Component: PasswordHealth,
  },
];

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './auth/PrivateRoute';
import { PublicRoute } from './auth/PublicRoute';
import { UserContextProvider } from './context/UserContext';
import { privateRouteConfig, publicRouteConfig } from './routes/routeConfig';
import { renderRouteElement } from './routes/RedirectRoute';

import './style/styles.scss';

export const AppRoutes = () => (
  <Routes>
    <Route element={<PublicRoute />}>
      {publicRouteConfig.map(({ index, path, Component: RouteComponent }) => (
        <Route
          index={index}
          path={path}
          element={<RouteComponent />}
          key={path}
        />
      ))}
    </Route>
    <Route element={<PrivateRoute />}>
      {privateRouteConfig.map(
        ({ path, Component: RouteComponent, outlets, redirectTo }) => (
          <Route
            key={path}
            path={path}
            element={renderRouteElement(path, RouteComponent, redirectTo)}
          >
            {outlets?.map(({ path, Component: OutletComponent }) => (
              <Route key={path} path={path} element={<OutletComponent />} />
            ))}
          </Route>
        )
      )}
    </Route>
    {/* Undefined pages, display 404. */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const NotFound = () => <p>nothing to see here: 404!</p>;

const App = () => (
  <Router>
    <UserContextProvider>
      <AppRoutes />
    </UserContextProvider>
  </Router>
);

export default App;

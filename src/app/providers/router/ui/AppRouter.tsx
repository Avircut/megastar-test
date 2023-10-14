import App from 'app/App';
import { Suspense } from 'react';
import {
  Route, Navigate, Link, createBrowserRouter, createRoutesFromElements,
} from 'react-router-dom';
import {
  AppRouteProps,
  routeConfig,
} from 'shared/config/routeConfig/routeConfig';

import { PageLoader } from 'widgets/PageLoader';
// TODO: Add there tree of ReactNodes to handle tree routes hierarchy
const renderWithWrapper = (route: AppRouteProps) => {
  const element = (
    <App>
      <Suspense fallback={<PageLoader />}>
        {route.element}
      </Suspense>
    </App>

  );
  return (
    <Route
      key={route.path}
      path={route.path}
      element={element}
      handle={{
        crumb: () => <Link to={route.path!}>{route.title}</Link>,
      }}
    />
  );
};

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      {Object.values(routeConfig).map(renderWithWrapper)}
      <Route path="/" element={<Navigate to="/departments" />} />
    </>,
  ),
);

export default AppRouter;

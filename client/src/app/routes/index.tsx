import { Outlet, RouteObject } from 'react-router-dom';
import { CategoryPage, HomePage, PostPage, NotFound } from 'pages';
import { ErrorFallback } from 'widgets/error-fallback';
import { ErrorBoundary } from 'react-error-boundary';

interface IRouters {
  name?: string;
  children?: {
    name?: string;
  }[];
}

type TypeRoutes = IRouters & RouteObject;
const routes = (isLogged: boolean): TypeRoutes[] => [
  {
    path: '/',
    name: 'Main',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <HomePage />
          </ErrorBoundary>
        ),
      },
      {
        path: 'post',
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <PostPage />
          </ErrorBoundary>
        ),
      },
      {
        path: 'category',
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <CategoryPage />
          </ErrorBoundary>
        ),
      },
    ],
  },
  {
    name: 'Not found',
    path: '*',
    element: <NotFound />,
  },
];

export default routes;

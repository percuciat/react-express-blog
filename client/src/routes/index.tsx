import { Navigate, RouteObject } from 'react-router-dom';
import MainLayout from '../layouts';
import { CategoryPage, HomePage, PostPage, Empty404, LoginPage } from '../pages';

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
    element: isLogged ? <MainLayout /> : <Navigate to="/login" />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'post',
        element: <PostPage />,
      },
      {
        path: 'category',
        element: <CategoryPage />,
      },
    ],
  },
  {
    name: 'Login',
    path: 'login',
    element: <LoginPage />,
  },
  {
    name: 'Not found',
    path: '*',
    element: <Empty404 />,
  },
];

export default routes;

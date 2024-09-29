import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/login';
import Home from '../pages/home';
import Root from './root';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
]);
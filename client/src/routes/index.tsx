import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/login';
import Home from '../pages/home';
import Root from './root';

const isAuth = false;

export const routes = createBrowserRouter([
  {
    path: '/',
    element: isAuth ? <Root /> : <Login />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
]);
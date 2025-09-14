import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home';
import Root from './root';
import { Register } from '../pages/register';


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
    path: '/register',
    element: <Register />
  }
]);
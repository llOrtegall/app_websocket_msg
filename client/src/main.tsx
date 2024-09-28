import { RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { routes } from './routes';

import './index.css';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
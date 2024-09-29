import { RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { routes } from './routes';

import './index.css';
import axios from 'axios';
import { API_URL } from './utils/constanst';
import { AuthProvider } from './auth';

axios.defaults.baseURL = `${API_URL}/api/v1`;
axios.defaults.withCredentials = true;

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  </StrictMode>
);
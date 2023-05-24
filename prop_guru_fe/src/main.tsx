import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import CardDetail from './components/CardDetail.js';
import './index.css';
import { StyledEngineProvider } from '@mui/material/styles';

import { BrowserRouter, createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
  },
  {
    path: '/card/:id',
    element: <CardDetail></CardDetail>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  </React.StrictMode>
);

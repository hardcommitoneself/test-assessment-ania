import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// pages
import { Home } from './pages/Home';
import { Error } from './pages/Error';
import reportWebVitals from './reportWebVitals';

// styles
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />
  }
]);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// routes.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import Cart from "./Cart";
import ShoeCategory from "./ShoeCategory";
import ShoeList from "./ShoeList";
import ErrorPage from "./ErrorPage"; // Optional error fallback page

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />, // Optional error handler
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/category",
        element: <ShoeCategory />,
      },
      {
        path: "/list",
        element: <ShoeList />,
      },
    ],
  },
]);

export default router;

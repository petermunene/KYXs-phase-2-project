import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "../src/components/Home";
import Cart from "../src/components/Cart";
import ShoeCategory from "../src/components/ShoeCategory";
import ShoesList from "../src/components/ShoesList";
/* import ErrorPage from "./ErrorPage";  */

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
        element: <ShoesList />,
      },
    ],
  },
]);

export default router;

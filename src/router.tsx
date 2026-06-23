import { createBrowserRouter } from "react-router-dom";

import Home from "./page/home/index";
import Card from "./page/card";
import NotFound from "./notfound/index";
import Produto from "./page/Produto/index"
import Layout from "./components/layout/index";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/carrinho",
        element: <Card />,
      },
      {
        path:"produto/:id",
        element:<Produto/>
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export { router };

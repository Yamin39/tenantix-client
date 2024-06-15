import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Apartment from "../pages/Apartment/Apartment";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/apartment",
        element: <Apartment></Apartment>,
      },
    ],
  },
]);

export default router;

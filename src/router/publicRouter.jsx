import Register from "../pages/auth/Register.jsx";
import Forget from "../pages/auth/Forget.jsx";
import Login from "../pages/auth/Login.jsx";
import PublicGard from "./PublicGard.jsx";

//create public Router
const publicRouter = [
  {
    element: <PublicGard />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/login/:token",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forget",
        element: <Forget />,
      },
    ],
  },
];

//export default publicRouter
export default publicRouter;

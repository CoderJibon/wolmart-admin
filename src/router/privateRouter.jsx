import PageLayout from "../components/PageLayout/PageLayout.jsx";
import Brand from "../pages/Dashboard/Brand.jsx";
import Category from "../pages/Dashboard/Category.jsx";
import CreateProduct from "../pages/Dashboard/CreateProduct.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import Order from "../pages/Dashboard/Order.jsx";
import Permission from "../pages/Dashboard/Permission.jsx";
import Product from "../pages/Dashboard/Product.jsx";
import Role from "../pages/Dashboard/Role.jsx";
import Tag from "../pages/Dashboard/Tag.jsx";
import User from "../pages/Dashboard/User.jsx";
import PrivateGard from "./PrivateGard.jsx";
//create private Router
const privateRouter = [
  {
    element: <PageLayout />,
    children: [
      {
        element: <PrivateGard />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/orders",
            element: <Order />,
          },
          {
            path: "/products",
            element: <Product />,
          },
          {
            path: "/products/create-product",
            element: <CreateProduct />,
          },
          {
            path: "/category",
            element: <Category />,
          },
          {
            path: "/tags",
            element: <Tag />,
          },
          {
            path: "/brands",
            element: <Brand />,
          },
          {
            path: "/user",
            element: <User />,
          },
          {
            path: "/role",
            element: <Role />,
          },
          {
            path: "/permission",
            element: <Permission />,
          },
        ],
      },
    ],
  },
];

//export default privateRouter
export default privateRouter;

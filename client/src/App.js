import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import AdminRoute from "./components/PrivateRoutes/AdminRoute";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute";
import Shipping from "./pages/Shipping/Shipping";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import LogIn from "./pages/Login/Login";
import Order from "./pages/Order/Order";
import OrderDetails from "./pages/Order/OrderDetails";
import ProductDetials from "./pages/ProductDetails/ProductDetials";
import Shop from "./pages/Shop/Shop";
import SingIn from "./pages/SignIn/SignIn";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/signin",
          element: <SingIn />,
        },
        {
          path: "/login",
          element: <LogIn />,
        },
        {
          path: "/product/:id",
          element: <ProductDetials />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
        {
          path: "/profile",
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },
        {
          path: "/shipping",
          element: (
            <PrivateRoute>
              <Shipping />
            </PrivateRoute>
          ),
        },
        {
          path: "/order",
          element: (
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          ),
        },
        {
          path: "/order/:id",
          element: (
            <PrivateRoute>
              <OrderDetails />
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard",
          element: (
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

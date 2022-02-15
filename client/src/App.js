import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import LogIn from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./components/NotFound/NotFound";
import Order from "./components/Order/Order";
import OrderDetails from "./components/Order/OrderDetails";
import AdminRoute from "./components/PrivateRoutes/AdminRoute";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute";
import ProductDetials from "./components/productDetails/ProductDetials";
import Profile from "./components/Profile/Profile";
import Shipping from "./components/Shipping/Shipping";
import Shop from "./components/Shop/Shop";
import SingIn from "./components/SignIn/SingIn";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SingIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/shop" element={<Shop />}>
          <Route path="colors/:color" element={<Shop />}></Route>
        </Route>
        <Route path="/product/:id" element={<ProductDetials />} />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/shipping"
          element={
            <PrivateRoute>
              <Shipping />
            </PrivateRoute>
          }
        />
        <Route
          path="/order"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <PrivateRoute>
              <OrderDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

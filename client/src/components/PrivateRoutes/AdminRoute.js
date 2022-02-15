import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return userInfo.isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;

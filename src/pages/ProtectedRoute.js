// PrivateRoute.jsx

import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
  let isAuthenticated = localStorage.getItem("isAuthenticated");// Kiểm tra xem người dùng đã đăng nhập hay chưa;
  console.log(localStorage.getItem("isAuthenticated"));
  return (
         isAuthenticated ?  <Outlet /> : <Navigate to="/login" replace/>
        // localStorage.getItem("isAuthenticated") ?  <Outlet /> : <Navigate to="/login" replace/>
  );
};

export default ProtectedRoute;



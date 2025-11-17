import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import { useAuth } from "../AuthContext";

// Lazy loaded pages
const Home = lazy(() => import('../pages/Home/Home'));
const Clients = lazy(() => import('../pages/Clients/Clients'));
const Orders = lazy(() => import('../pages/Orders/Orders'));
const OrderDetail = lazy(() => import('../pages/OrderDetail/index'));
const Delegates = lazy(() => import('../pages/Delegates/index'));
const Return = lazy(() => import('../pages/Return/return'));
const ReturnDetail = lazy(() => import('../pages/ReturnDetail/return.main'));
const News = lazy(() => import('../pages/News/news'));
const Login = lazy(() => import('../pages/Login/login'));

const PrivateRoute = ({ children }) => {
  const { logged } = useAuth();
  return logged ? children : <Navigate to="/login" replace />;
};

// Route definitions
const routes = [
  { path: "/login", element: <Login /> },
  { path: "/", element: <Home />, private: true },
  { path: "/clients", element: <Clients />, private: true },
  { path: "/delegates", element: <Delegates />, private: true },
  { path: "/delegates/:id", element: <Delegates />, private: true },
  { path: "/orders", element: <Orders />, private: true },
  { path: "/orderDetail/:idHash", element: <OrderDetail />, private: true },
  { path: "/return", element: <Return />, private: true },
  { path: "/returnDetail/:idHash", element: <ReturnDetail />, private: true },
  { path: "/news", element: <News />, private: true },
];

const RouteList = () => (
  <Suspense
    fallback={
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
        <Spin size="large" />
      </div>
    }
  >
    <Routes>
      {routes.map(({ path, element, private: isPrivate }) => (
        <Route
          key={path}
          path={path}
          element={isPrivate ? <PrivateRoute>{element}</PrivateRoute> : element}
        />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default RouteList;

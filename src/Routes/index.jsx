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
const ChildUser = lazy(() => import('../pages/Clients/Component/Users/childUser'));
const Login = lazy(() => import('../pages/Login/login'));




const PrivateRoute = ({ children }) => {
  const { logged } = useAuth();
  return logged ? children : <Login />;
};


const RouteList = () => (
  <Suspense fallback={<Spin size="large" style={{ display: 'none', margin: '100px auto' }} />}>
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/home/:id" element={<PrivateRoute><Home /></PrivateRoute>} />

      <Route path="/clients" element={<PrivateRoute><Clients /></PrivateRoute>} />
      <Route path="/clients/:id" element={<PrivateRoute><Clients /></PrivateRoute>}>
        <Route path="details" element={<ChildUser />} />
      </Route>

      <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
      <Route path="/OrderDetail/:idHash" element={<PrivateRoute><OrderDetail /></PrivateRoute>} />

      <Route path="/delegates" element={<PrivateRoute><Delegates /></PrivateRoute>} />
      <Route path="/delegates/:id" element={<PrivateRoute><Delegates /></PrivateRoute>} />

      <Route path="/Return" element={<PrivateRoute><Return /></PrivateRoute>} />
      <Route path="/ReturnDetail/:idHash" element={<PrivateRoute><ReturnDetail /></PrivateRoute>} />

      <Route path="/news" element={<PrivateRoute><News /></PrivateRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default RouteList;

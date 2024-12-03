import React, { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import {Layout, Spin} from "antd";

import "antd/dist/reset.css";

const Home = lazy(() => import("../pages/Home/Home"));
const Clients = lazy(() => import("../pages/Clients/Clients"));
const Orders = lazy(() => import("../pages/Orders/Orders"));
const Delegates = lazy(() => import("../pages/Delegates"));
const Login = lazy(() => import("../pages/Login/login"));

const PrivateRoute = ({ children }) => {
    const logged = JSON.parse(localStorage.getItem("loggedIns"))
    return logged ? children : <Navigate to="/login" replace />;
};

const RouteList = () => {
    return (
        <Suspense fallback={<Spin tip="Yükleniyor..." />}>
               <Routes>
                   {/* Public Route */}
                   <Route path="/login" element={<Login />} />

                   {/* Private Routes */}
                   <Route
                       path="/"
                       element={
                           <PrivateRoute>
                               <Home />
                           </PrivateRoute>
                       }
                   />
                   <Route
                       path="/home/:id"
                       element={
                           <PrivateRoute>
                               <Home />
                           </PrivateRoute>
                       }
                   />
                   <Route
                       path="/clients"
                       element={
                           <PrivateRoute>
                               <Clients />
                           </PrivateRoute>
                       }
                   />
                   <Route
                       path="/clients/:id"
                       element={
                           <PrivateRoute>
                               <Clients />
                           </PrivateRoute>
                       }
                   />
                   <Route
                       path="/orders"
                       element={
                           <PrivateRoute>
                               <Orders />
                           </PrivateRoute>
                       }
                   />
                   <Route
                       path="/delegates"
                       element={
                           <PrivateRoute>
                               <Delegates />
                           </PrivateRoute>
                       }
                   />

                   {/* Fallback */}
                   <Route path="*" element={<Navigate to="/" replace />} />
               </Routes>
        </Suspense>
    );
};

export default RouteList;
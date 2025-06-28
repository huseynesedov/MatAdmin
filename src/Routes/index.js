import React, { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Spin } from "antd";

import "antd/dist/reset.css";
import OrderDetail from "../pages/OrderDetail";
import ChildUser from "../pages/Clients/Component/Users/childUser";

const Home = lazy(() => import("../pages/Home/Home"));
const Clients = lazy(() => import("../pages/Clients/Clients"));
const Orders = lazy(() => import("../pages/Orders/Orders"));
const Delegates = lazy(() => import("../pages/Delegates"));
const Login = lazy(() => import("../pages/Login/login"));
const Return = lazy(() => import("../pages/Return/return"));
const ReturnDetail = lazy(() => import("../pages/ReturnDetail/return.main"));

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
                       }>
                       <Route path="details" element={<ChildUser />} />
                   </Route>
                   <Route
                       path="/orders"
                       element={
                           <PrivateRoute>
                               <Orders />
                           </PrivateRoute>
                       }
                   />
                   <Route
                       path="/OrderDetail/:idHash"
                       element={
                           <PrivateRoute>
                               <OrderDetail />
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
                   <Route
                       path="/delegates/:id"
                       element={
                           <PrivateRoute>
                               <Delegates />
                           </PrivateRoute>
                       }
                   />

                <Route
                    path="/Return"
                    element={
                        <PrivateRoute>
                            <Return />
                        </PrivateRoute>
                    }
                />
                 <Route
                    path="/ReturnDetail/:idHash"
                    element={
                        <PrivateRoute>
                            <ReturnDetail />
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

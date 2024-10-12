import { Route, Routes } from "react-router-dom";
import React from "react";

import Home from '../pages/Home/Home';

import Clients from '../pages/Clients/Clients';

import Orders from '../pages/Orders/Orders';

import Delegates from '../pages/Delegates';


const RouteList = () => {
    return <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Clients" element={<Clients />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Delegates" element={<Delegates />} />
        </Routes>
    </>
}

export default RouteList

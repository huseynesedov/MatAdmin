import React, {useEffect, useState} from "react";
import {BrowserRouter, BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {Layout, Spin} from "antd";

import "antd/dist/reset.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
// import SkeletonScreen from "./Loader/index";
import {SearchProvider} from "./searchprovider";
import RouteList from "./Routes";
import Login from "./pages/Login/login";
import {AuthProvider, useAuth} from "./AuthContext";

function AppContent() {
    const {logged, loading} = useAuth();
    const load =  localStorage.getItem("loading");
    const [loads, setLoadingValue] = useState(false);
    useEffect(() => {
        setLoadingValue(load)
    }, [load]);

    // if (loading) {
    //     return <SkeletonScreen/>;
    // }


    return logged ? (
            <div style={{minHeight: "100vh !important", width: '100%'}} className='d-flex w-100'>
                <div style={{width: 250}} className="site-layout-background">
                    <Sidebar/>
                </div>
                <div className='main'>
                    <Header/>
                    <RouteList/>
                </div>
            </div>
    ) : (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<Navigate to="/login" replace/>}/>
        </Routes>
    );

}

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <SearchProvider>
                    <AppContent/>
                </SearchProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;

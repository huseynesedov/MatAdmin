import React, {useEffect, useState} from "react";
import {BrowserRouter, BrowserRouter as Router, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {Layout, Spin} from "antd";

import "antd/dist/reset.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import {SearchProvider} from "./searchprovider";
import RouteList from "./Routes";
import Login from "./pages/Login/login";
import {AuthProvider, useAuth} from "./AuthContext";

function AppContent() {
    const {loading} = useAuth();
    const load =  localStorage.getItem("loading");
    const [loads, setLoadingValue] = useState(false);
    const [logged, setLogged] = useState(true);
    const storedLogged = JSON.parse(localStorage.getItem("loggedIns"))
    const navigate = useNavigate();
    useEffect(() => {
        setLoadingValue(load)
    }, [load]);


    useEffect(() => {
        setLogged(storedLogged);

        if (storedLogged) navigate('/');

    }, [storedLogged]);

    useEffect(() => {
        console.log(logged, 'logged logged logged'); // logged değişkeni her güncellendiğinde çalışır
    }, [logged]);
    return logged ? (
            <div className="d-flex w-100" 
            style={{maxWidth:"1400px"}}
            >
                <div>
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
            {/* <Route path="*" element={<Navigate to="/login" replace/>}/> */}
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

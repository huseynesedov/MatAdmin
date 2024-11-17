import React, { useEffect } from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import { Layout, Spin } from "antd";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import SkeletonScreen from "./Loader/index";
import { SearchProvider } from "./searchprovider";
import RouteList from "./Routes";
import Login from "./pages/Login/login";
import { AuthProvider, useAuth } from "./AuthContext";
import {AccountApi} from "./api/account.api";

function AppContent() {
    const { logged, loading, loginLoading, logout } = useAuth();

    useEffect(() => {
        console.log("Logged In:", logged);

    }, [logged]);

    if (loading) {
        return <SkeletonScreen />;
    }



    return logged ? (
        <Layout style={{ minHeight: "100vh" }}>
            <Layout.Sider width={250} className="site-layout-background">
                <Sidebar />
            </Layout.Sider>
            <Layout>
                <Header />
                <MainContent>
                    <RouteList />
                </MainContent>
            </Layout>
        </Layout>
    ) : (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );

}

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <SearchProvider>
                    <AppContent />
                </SearchProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;

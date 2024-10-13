import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout, Spin } from 'antd';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';


import { SearchProvider } from './searchprovider';
import RouteList from './Routes';
import Login from './pages/Login/login';
import { AuthProvider } from './AuthContext';

const App = ({ loggedIn, loginLoading }) => {
    return (
        <>
            {loggedIn ? (
                <Layout style={{ minHeight: '100vh' }}>
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
                // <Spin spinning={loginLoading} tip="Loading...">
                    <Login />
                // </Spin>
            )}
        </>
    );
};


const WrappedApp = () => {
    return (
        <AuthProvider>
            <SearchProvider>
                <Router>
                    <App />
                </Router>
            </SearchProvider>
        </AuthProvider>
    );
};

export default WrappedApp;

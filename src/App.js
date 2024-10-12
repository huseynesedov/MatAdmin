import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';


import { SearchProvider } from './searchprovider';
import RouteList from './Routes';

const App = () => {
    return (
        <SearchProvider>
            <Router>
                <Layout style={{ minHeight: '100vh' }}>
                    <Layout.Sider width={250} className="site-layout-background">
                        
                        {/* Left Bar */}
                        <Sidebar />
                    </Layout.Sider>
                    <Layout>
                        {/* Top Bar */}
                        <Header />

                        <MainContent>

                            {/* Pages */}
                            <RouteList />

                        </MainContent>
                    </Layout>
                </Layout>
            </Router>
        </SearchProvider>
    );
};

export default App;

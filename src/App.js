import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';

import Home from './pages/Home/Home';
import Clients from './pages/Clients/Clients';
import Orders from './pages/Orders/Orders';

import { SearchProvider } from './searchprovider';

const App = () => {
    return (
        <SearchProvider>
            <Router>
                <Layout style={{ minHeight: '100vh' }}>
                    <Layout.Sider width={250} className="site-layout-background">
                        <Sidebar />
                    </Layout.Sider>
                    <Layout>
                        <Header />
                        <Layout.Content>
                            <MainContent>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/Clients" element={<Clients />} />
                                    <Route path="/Orders" element={<Orders/>} />
                                </Routes>
                            </MainContent>
                        </Layout.Content>
                    </Layout>
                </Layout>
            </Router>
        </SearchProvider>
    );
};

export default App;

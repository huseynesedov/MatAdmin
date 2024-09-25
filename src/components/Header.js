import React from 'react';
import { Layout } from 'antd';
import Topbar from './Topbar';

const { Header: AntHeader } = Layout;

const Header = () => {
    return (
        <AntHeader className="site-layout-background" style={{ padding: 0 }}>
            <Topbar />
        </AntHeader>
    );
};

export default Header;

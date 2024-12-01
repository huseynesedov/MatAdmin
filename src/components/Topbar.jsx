import React from 'react';
import { Input, Row, Col, Menu, Avatar, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import '../assets/styles/Topbar.scss';
import Images from '../assets/images/js/Images';
import { useAuth } from '../AuthContext';



const Topbar = () => {
    const { logout } = useAuth();
    const profileMenu = (

        <Menu>
            <Menu.Item key="1">Profile</Menu.Item>
            <Menu.Item key="2">Settings</Menu.Item>
            <Menu.Item key="3" onClick={logout}>Logout</Menu.Item>

        </Menu>
    );
    return (
        <div className="topbar">
            <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                <Col>
                    <Menu mode="horizontal" defaultSelectedKeys={['1']} className="menu">
                        <Menu.Item key="1">Programlar</Menu.Item>
                        <Menu.Item key="2">Təyin Etmələri</Menu.Item>
                        <Menu.Item key="3">İşlemler</Menu.Item>
                        <Menu.Item key="4">Sync</Menu.Item>
                        <Menu.Item key="5">Bildirimler</Menu.Item>
                        <Menu.Item key="6">Yardım</Menu.Item>
                    </Menu>
                </Col>
                <Col>
                    <Input
                        placeholder="Axtarış"
                        prefix={<img src={Images.search_gray} alt="search" />}
                        className="search-input"
                    />
                </Col>
                <Col>
                    <Dropdown overlay={profileMenu}>
                        <div className="profile">
                            <Avatar src="https://i.pravatar.cc/300" />
                            <span className="profile-name">Təmsilçi məlumatı</span>
                            <DownOutlined />
                        </div>
                    </Dropdown>
                </Col>
            </Row>
        </div>
    );
};

export default Topbar;

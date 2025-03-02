import React from 'react';
import { Input, Row, Col, Menu, Avatar, Dropdown } from 'antd';
import { DownOutlined, MenuOutlined } from '@ant-design/icons';
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
            <Row justify="end" align="middle" style={{ width: '100%' }}>
                <Col className={'my-3'}>
                    <Dropdown overlay={profileMenu}>
                        <div className="profile">
                            <Avatar src="https://i.pravatar.cc/300" />
                            {/* <span className="profile-name">Təmsilçi məlumatı</span> */}
                            <DownOutlined className='ms-3' />
                        </div>
                    </Dropdown>
                </Col>
            </Row>
        </div>
    );
};

export default Topbar;

import React from 'react';
import { Row, Col, Menu, Avatar, Dropdown, Badge } from 'antd';
import { DownOutlined, BellOutlined } from '@ant-design/icons';
import '../assets/styles/Topbar.scss';
import { useAuth } from '../AuthContext';

const Topbar = () => {
  const { logout } = useAuth();

  const profileMenu = (
    <Menu>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Settings</Menu.Item>
      <Menu.Item key="3" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  // Notification dropdown menu
  const notifMenu = (
    <Menu
      items={[
        { key: '1', label: 'Yeni sifarişiniz var' },
        { key: '2', label: 'Mesaj aldınız' },
        { key: '3', label: 'Sistem yeniləndi' },
      ]}
    />
  );

  return (
    <div className="topbar">
      <Row justify="end" align="middle" style={{ width: '100%' }}>
        {/* Notification Dropdown */}
        <Col className="me-4">
          <Dropdown overlay={notifMenu} trigger={['click']} placement="bottomRight">
            <Badge count={3} offset={[0, 5]}>
              <BellOutlined style={{ fontSize: 22, cursor: 'pointer', color: '#555' }} />
            </Badge>
          </Dropdown>
        </Col>

        {/* Profile Dropdown */}
        <Col className={'my-3'}>
          <Dropdown overlay={profileMenu}>
            <div className="profile">
              <Avatar src="https://i.pravatar.cc/300" />
              <DownOutlined className="ms-3" />
            </div>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
};

export default Topbar;

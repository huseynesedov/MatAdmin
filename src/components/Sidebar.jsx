import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import Images from '../assets/images/js/Images';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [selectedKey, setSelectedKey] = useState('1');

    // Sayfa yenilendiğinde localStorage'dan anahtar değeri oku
    useEffect(() => {
        const savedKey = localStorage.getItem('selectedKey');
        if (savedKey) {
            setSelectedKey(savedKey);
        }
    }, []);

    const handleClick = (key) => {
        setSelectedKey(key);
        localStorage.setItem('selectedKey', key); // Seçilen anahtarı kaydet
    };

    const menuItems = [
        { key: '1', icon: Images.dashborad_blue, label: 'Məhsullar', link: "/", status: "true" },
        { key: '2', icon: Images.Family_blue, label: 'Müştərilər', link: "/Clients", status: "true" },
        { key: '3', icon: Images.BoardList_blue, label: 'Sifarişlər', link: "/Orders", status: "true" },
        { key: '4', icon: Images.List_blue, label: 'Məhsul Qrupları' },
        { key: '5', icon: Images.User_blue, label: 'İstehsalçı' },
        { key: '6', icon: Images.Rule_blue, label: 'Satış şərtləri' },
        { key: '7', icon: Images.Message_blue, label: 'Mesajlar' },
        { key: '8', icon: Images.Notifications_blue, label: 'Duyurular və Xəbərlər' },
        { key: '9', icon: Images.Exclamation_blue, label: 'Günün Məhsulu' },
        { key: '10', icon: Images.Heart_blue, label: 'Sövğüyət' },
        { key: '11', icon: Images.Report_blue, label: 'Raporlar' },
        { key: '12', icon: Images.Return_blue, label: 'Iade' },
    ];

    return (
        <div className="sidebar">
            <div className="logo">
                <img src={Images.Logo} alt="Logo" style={{ width: '100%', padding: '20px' }} />
            </div>

            <Menu
                mode="inline"
                className='mt-4'
                selectedKeys={[selectedKey]}
                style={{ height: '100%', borderRight: 0 }}
            >
                {menuItems.map(item => (
                    <Menu.Item
                        key={item.key}
                        className={selectedKey === item.key ? 'dashborad' : ''}
                        icon={
                            <img
                                src={item.icon}
                                style={{
                                    opacity: item.status !== "true" ? 0.5 : 1,
                                    cursor: item.status !== "true" ? 'not-allowed' : 'pointer'
                                }}
                            />
                        }
                        onClick={() => handleClick(item.key)}
                        disabled={item.status !== "true"}
                        style={{
                            cursor: item.status !== "true" ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {item.status === "true" ? (
                            <Link to={item.link} className='t_8F'>
                                {item.label}
                            </Link>
                        ) : (
                            <span className='t_8F'>{item.label}</span>
                        )}
                    </Menu.Item>
                ))}
            </Menu>
        </div>
    );
};

export default Sidebar;

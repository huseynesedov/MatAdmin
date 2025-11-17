import React, { useState, useEffect, useMemo } from "react";
import { Layout, Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Images from "../assets/images/js/Images";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

const { Sider } = Layout;

// Menu item-ları
const menuItems = [
    { key: "1", icon: Images.dashborad_blue, label: "Məhsullar", link: "/", status: true },
    { key: "2", icon: Images.Family_blue, label: "Müştərilər", link: "/clients", status: true },
    { key: "3", icon: Images.BoardList_blue, label: "Sifarişlər", link: "/orders", status: true },
    { key: "4", icon: Images.User_blue, label: "Nümayəndələr", link: "/delegates", status: true },
    { key: "8", icon: Images.Notifications_blue, label: "Duyurular və Xəbərlər", link: "/news", status: true },
    { key: "12", icon: Images.Return_blue, label: "İade", link: "/return", status: true },
    { key: "5", icon: Images.List_blue, label: "Məhsul Qrupları", status: false },
    { key: "6", icon: Images.Rule_blue, label: "Satış şərtləri", status: false },
    { key: "7", icon: Images.Message_blue, label: "Mesajlar", status: false },
    { key: "9", icon: Images.Exclamation_blue, label: "Günün Məhsulu", status: false },
    { key: "10", icon: Images.Heart_blue, label: "Sövğüyət", status: false },
    { key: "11", icon: Images.Report_blue, label: "Raporlar", status: false },
];

const Sidebar = () => {
    const { collapsed } = useAuth();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState(() => {
        const savedKey = localStorage.getItem("selectedKey");
        const activeItem = menuItems.find((item) => item.link === location.pathname);
        return activeItem?.key || savedKey || "1";
    });
    const [visible, setVisible] = useState(false);

    // Refresh zamanı selectedKey yenilə
    useEffect(() => {
        const activeItem = menuItems.find((item) => item.link === location.pathname);
        if (activeItem) {
            setSelectedKey(activeItem.key);
            localStorage.setItem("selectedKey", activeItem.key);
        }
    }, [location.pathname]);

    const handleClick = (key) => {
        setSelectedKey(key);
        localStorage.setItem("selectedKey", key);
        setVisible(false);
    };

    // Menu item-larını render etmək üçün useMemo
    const renderMenuItems = useMemo(
        () =>
            menuItems.map((item) => {
                const isActive = item.status === true;
                return (
                    <Menu.Item
                        key={item.key}
                        icon={
                            item.icon && (
                                <img
                                    src={item.icon}
                                    alt={item.label}
                                    style={{
                                        opacity: isActive ? 1 : 0.5,
                                        cursor: isActive ? "pointer" : "not-allowed",
                                    }}
                                />
                            )
                        }
                        onClick={() => isActive && handleClick(item.key)}
                        disabled={!isActive}
                    >
                        {isActive && item.link ? <Link to={item.link}>{item.label}</Link> : <span>{item.label}</span>}
                    </Menu.Item>
                );
            }),
        []
    );

    return (
        <>
            <Button
                className="menu-button d-md-none"
                icon={<MenuOutlined />}
                onClick={() => setVisible(true)}
            />

            <Sider
                collapsed={collapsed}
                className="desktop-sidebar"
                style={{ left: 0, top: 0, bottom: 0, zIndex: 1000 }}
            >
                <div style={{ textAlign: "center", padding: "10px" }}>
                    <img
                        src={Images.Logo}
                        alt="Logo"
                        style={{ width: collapsed ? "50px" : "100%", transition: "0.3s" }}
                    />
                </div>
                <Menu mode="inline" selectedKeys={[selectedKey]} style={{ height: "100%" }}>
                    {renderMenuItems}
                </Menu>
            </Sider>

            <Drawer
                title="Menü"
                placement="left"
                closable={true}
                onClose={() => setVisible(false)}
                open={visible}
            >
                <Menu mode="inline" selectedKeys={[selectedKey]}>
                    {renderMenuItems}
                </Menu>
            </Drawer>

            <style>{`
        @media (max-width: 768px) {
          .desktop-sidebar { display: none; }
          .menu-button { position: fixed; top: 15px; left: 15px; z-index: 1; }
        }
      `}</style>
        </>
    );
};

export default Sidebar;

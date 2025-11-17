import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { BellOutlined } from '@ant-design/icons'
import { Badge, Col, Dropdown, Menu } from 'antd'
import { useAuth } from '../../AuthContext'
import { useNotifications } from '../../NotificationContext'
import { communicationApi } from '../../api/communication'

const GetAll = () => {

    const { notifications, loading, loadNotifications } = useNotifications();
    const { openNotification } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        loadNotifications();
    }, []);

    // ⭐ idHash-i başqa API-yə göndərən funksiya
    const sendIdHash = async (idHash) => {
        try {
            const res = await communicationApi.MarkNotificationAsRead(idHash);
            localStorage.setItem("selectedKey", "3");
            loadNotifications();  // bildiriş siyahısını yenilə


        } catch (err) {
            console.error("Hash API error:", err);
        }
    };


    const formatDate = (dateString) => {
        const d = new Date(dateString);
        return d.toLocaleString("az-AZ", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const notifMenu = (
        <Menu
            items={notifications.map((notif) => ({
                key: notif.idHash,
                disabled: notif.isRead,
                label: (
                    <div
                        style={{
                            width: "300px",
                            opacity: notif.isRead ? 0.5 : 1,
                            pointerEvents: notif.isRead ? "none" : "auto",
                            lineHeight: "1.4"
                        }}
                        onClick={async () => {
                            if (notif.isRead) {
                                openNotification(
                                    "Diqqət",
                                    "Bu bildiriş oxunmadığı üçün keçid edilə bilməz",
                                    true
                                );
                                return;
                            }

                            if (!notif.idHash) {
                                openNotification(
                                    "Xəta",
                                    "Səhifəyə keçid uğursuzdur",
                                    true
                                );
                                return;
                            }

                            // ⭐ Sənin pattern-ə uyğun API çağırışı
                            await sendIdHash(notif.idHash);

                            navigate(`/orderDetail/${notif.orderIdHash}`);
                        }}
                    >
                        <div style={{
                            fontWeight: 500,
                            wordBreak: "break-all",
                            whiteSpace: "normal",
                            lineHeight: "1.7"
                        }}>
                            {notif.message}
                        </div>
                        <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                            {formatDate(notif.createdDate)}
                        </div>
                    </div>
                ),
            }))}
        />
    );

    return (
        <Col className="me-4">
            <Dropdown
                overlay={notifMenu}
                loading={loading}
                trigger={['click']}
                placement="bottomRight"
            >
                <Badge count={loading ? "..." : notifications.filter(n => !n.isRead).length}>
                    <BellOutlined style={{ fontSize: 22, cursor: 'pointer', color: '#555' }} />
                </Badge>
            </Dropdown>
        </Col>
    );
};

export default GetAll;

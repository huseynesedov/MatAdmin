import { createContext, useContext, useState } from "react";
import { communicationApi } from "./api/communication";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadNotifications = async () => {
        setLoading(true);
        try {
            const res = await communicationApi.GetAllNotificationList();
            setNotifications(res);
        } catch (err) {
            console.error("Notification API error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                loading,
                loadNotifications
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);

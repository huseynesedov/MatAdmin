import React, { createContext, useState, useContext, useEffect } from "react";
import { AccountApi } from "./api/account.api";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false);
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(window.innerWidth < 768);

    const storedLogged = JSON.parse(localStorage.getItem("loggedIns"))
    const openNotification = (message, description, error) => {
        if (error) {
            notification.error({
                message,
                description,
                placement: 'topRight'
            });
        } else {
            notification.info({
                message,
                description,
                placement: 'topRight'
            });
        }
    };

    const AdminLogin = (userCode, passwordHash) => {
        setLoginLoading(true);
        setLoading(true);
        AccountApi.AdminLogin({ userCode, passwordHash })
            .then((res) => {
                localStorage.setItem("loggedIn", true);
                localStorage.setItem("loggedIns", true);
                localStorage.setItem("token", res.accessToken);
                localStorage.setItem("refreshToken", res.refreshToken);
                notification.success({
                    message: "Giriş Başarılı!",
                    description: "Hoş Geldiniz!",
                });
            })
            .catch((error) => {
                localStorage.setItem("loggedIns", false);
                console.log('acatch false')
                notification.error({
                    message: "Hata Oluştu",
                    description: error.response?.data?.message || "Bilinmeyen bir hata oluştu.",
                });
            })
            .finally(() => {
                setLoginLoading(false);
            });
    };

    useEffect(() => {
        if (!storedLogged) localStorage.setItem("loggedIns", false);
        setLoading(false);
    }, [storedLogged]);


    const logout = () => {
        localStorage.setItem("loggedIns", false);
        localStorage.removeItem("loggedIns");
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate("/login");
    };


    useEffect(() => {
        const handleResize = () => {
            setCollapsed(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };


    return (
        <AuthContext.Provider
            value={{
                loading,
                loginLoading,
                AdminLogin,
                logout,
                openNotification,
                collapsed, 
                toggleSidebar
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

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
    const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
    const navigate = useNavigate();

    const [logged, setLogged] = useState(() => {
        return JSON.parse(localStorage.getItem("loggedIns")) || false;
    });


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
                localStorage.setItem("token", res.accessToken);
                localStorage.setItem("refreshToken", res.refreshToken);
                localStorage.setItem("loggedIns", true);

                setLogged(true);
                notification.success({
                    message: "Giriş Başarılı!",
                    description: "Hoş Geldiniz!",
                });

                navigate("/");
            })
            .catch((error) => {
                localStorage.setItem("loggedIns", false);
                setLogged(false);
                notification.error({
                    message: "Hata Oluştu",
                    description: error.response?.data?.message || "Bilinmeyen bir hata oluştu.",
                });

            })
            .finally(() => {
                setLoginLoading(false);
            });
    };
    const logout = () => {
        localStorage.setItem("loggedIns", false);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setLogged(false);
        navigate("/login");
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
                logged,
                setLogged,
                // toggleSidebar
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
import React, { createContext, useState, useContext, useEffect } from "react";
import { AccountApi } from "./api/account.api";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [logged, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false);
    const navigate = useNavigate();

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

    useEffect(() => {
        const storedLoggedIn = localStorage.getItem('loggedIn');
        if (storedLoggedIn) {
            setLoggedIn(JSON.parse(storedLoggedIn));
        } else {
            setLoggedIn(false);
        }
        setLoading(false);
    }, []);

    const AdminLogin = (userCode, passwordHash) => {
        setLoading(true);
        AccountApi.AdminLogin({ userCode, passwordHash })
            .then((res) => {
                setLoggedIn(true);
                localStorage.setItem("loggedIn", true);
                localStorage.setItem("loggedIns", true);
                localStorage.setItem("token", res.accessToken);
                localStorage.setItem("refreshToken", res.refreshToken);
                notification.success({
                    message: "Giriş Başarılı!",
                    description: "Hoş Geldiniz!",
                });
                navigate("/");
            })
            .catch((error) => {
                setLoggedIn(false);
                console.log('acatch false')
                notification.error({
                    message: "Hata Oluştu",
                    description: error.response?.data?.message || "Bilinmeyen bir hata oluştu.",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };


    useEffect(() => {
        const storedLoggedIn = localStorage.getItem("loggedIns");
        if (storedLoggedIn) {
            setLoggedIn(JSON.parse(storedLoggedIn));
        } else {
            setLoggedIn(false);
        }
        setLoading(false);
    }, []);


    const logout = () => {
        setLoggedIn(false);
        localStorage.removeItem("loggedIns");
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                logged,
                loading,
                loginLoading,
                AdminLogin,
                logout,
                openNotification
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
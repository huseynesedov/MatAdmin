import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

import "antd/dist/reset.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { SearchProvider } from "./searchprovider";
import RouteList from "./Routes";
import Login from "./pages/Login/login";
import { AuthProvider, useAuth } from "./AuthContext";
import { AccountApi } from "./api/account.api";

function AppContent() {
    const { logged, setLogged, logout, openNotification } = useAuth();
    const navigate = useNavigate();

    // Giriş kontrolü
    useEffect(() => {
        const loggedIns = localStorage.getItem("loggedIns");
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");

        if (loggedIns !== "true" || !token || !refreshToken || !loggedIns) {
            setLogged(false);
            navigate("/login");
            localStorage.removeItem("loggedIns");
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("selectedKey");
        } else {
            setLogged(true);
        }
    }, [navigate]);


    const intervalRef = useRef(null);
    // Token decode fonksiyonu
    const decodeJwt = (token) => {
        try {
            const payloadBase64 = token.split(".")[1];
            const decodedPayload = atob(payloadBase64);
            return JSON.parse(decodedPayload);
        } catch (error) {
            console.error("Token decoding error:", error);
            return null;
        }
    };



    let refreshInterval = null;
    const updateToken = () => {
        if (localStorage.getItem("loggedIns") !== "true") {
            return;
        }

        let t = localStorage.getItem("token");
        let dec = decodeJwt(t);
        if (!dec) return;

        let timeout = (dec?.exp - dec?.iat - 120) * 100;


        if (refreshInterval) {
            clearInterval(refreshInterval);
        }

        refreshInterval = setInterval(() => {
            if (localStorage.getItem("loggedIns") === "true") {
                AccountApi.RefreshToken({
                    refreshToken: localStorage.getItem("refreshToken"),
                })
                    .then((response) => {
                        localStorage.setItem("refreshToken", response.refreshToken);
                        localStorage.setItem("token", response.accessToken);
                    })
                    .catch(() => {
                        logout();
                        openNotification('Yenidən giriş tələb olunur !', true)
                        clearInterval(refreshInterval);
                    });
            } else {
                clearInterval(refreshInterval);
            }
        }, timeout);
    };



    useEffect(() => {
        if (logged) {
            updateToken();
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [logged]);

    if (!logged) {
        return <Login />;
    }

    return (
        <div className="d-flex w-100"
        // style={{ maxWidth: "1400px" }}
        >
            <div>
                <Sidebar />
            </div>
            <div className="main w-100">
                <Header />
                <RouteList />
            </div>
        </div>
    );
}

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <SearchProvider>
                    <AppContent />
                </SearchProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;

import React, { useEffect, useState } from "react";
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
    const { logged, setLogged, logout } = useAuth();
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



    // Token yenileme işlemi
    const updateToken = () => {
        const loggedIns = localStorage.getItem("loggedIns");
        if (loggedIns !== "true") return;

        const token = localStorage.getItem("token");
        const decoded = decodeJwt(token);
        if (!decoded) return;

        const timeout = (decoded.exp - decoded.iat - 120) * 100;

        const interval = setInterval(() => {
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
                        clearInterval(interval);
                    });
            } else {
                clearInterval(interval);
            }
        }, timeout);
    };

    // Refresh işlemini başlatan useEffect
    useEffect(() => {
        if (!logged) {
            updateToken();
        }
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
            <div className="main">
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

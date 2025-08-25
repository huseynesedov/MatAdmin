import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

import { SearchProvider } from "./searchprovider";
import { AuthProvider, useAuth } from "./AuthContext";
import { AccountApi } from "./api/account.api";


import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import RouteList from "./Routes";
import Login from "./pages/Login/login";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

function AppContent() {
    const { logged, setLogged, logout, openNotification } = useAuth();
    const navigate = useNavigate();

    // 🔥 Firebase Config
    const firebaseConfig = {
        apiKey: "AIzaSyAY4xPP3d_42JVcB0gySpcR_muct9Cijus",
        authDomain: "matb2b-54a06.firebaseapp.com",
        projectId: "matb2b-54a06",
        storageBucket: "matb2b-54a06.firebasestorage.app",
        messagingSenderId: "463425467837",
        appId: "1:463425467837:web:53d8a0ac26a08723bf0ed4",
        measurementId: "G-K2TZ0QSBFJ",
    };

    const vapidKey =
        "BAT0FgBF3i5A0tQajz-CezPaX8-y3lhGANijxI1BmOL4T9NA3Vem8QByWd2bhb4zvbFJy-r3pQOB4E-d3mYL-gw";

    useEffect(() => {
        // Firebase init
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);

        // İcazə soruş və token al
        Notification.requestPermission().then(async (permission) => {
            if (permission === "granted") {
                try {
                    const token = await getToken(messaging, { vapidKey });
                    console.log("✅ FCM Token:", token);
                    // Backendə göndərə bilərsən burda
                } catch (err) {
                    console.error("❌ Token alınmadı:", err);
                }
            }
        });

        // 🔔 Realtime mesaj listener
        const unsubscribe = onMessage(messaging, (payload) => {
            console.log("📩 Yeni mesaj:", payload);
            if (payload?.notification) {
                openNotification(
                    `${payload.notification.title}`,
                    `${payload.notification.body}`,
                    false // error = true verib qırmızı da edə bilərsən
                );
            }
        });

        return () => unsubscribe();
    }, []);

    // ------------------- LOGIN CHECK -------------------
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
                        openNotification("Yenidən giriş tələb olunur !", true);
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
        <div className="d-flex w-100">
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

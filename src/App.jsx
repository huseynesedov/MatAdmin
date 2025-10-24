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
import { IdsProvider } from "./Contexts/ids.context";

function AppContent() {

    const { logged, setLogged, logout, openNotification } = useAuth();
    const navigate = useNavigate();

    // 🔥 Firebase Config
    const firebaseConfig = {
        apiKey: "AIzaSyBMpTtk-Zp0K_Zj0F-7AZb6NMXs66g-pMs",
        authDomain: "matt-6c92c.firebaseapp.com",
        projectId: "matt-6c92c",
        storageBucket: "matt-6c92c.firebasestorage.app",
        messagingSenderId: "37643677283",
        appId: "1:37643677283:web:0f3b40e218976717271256",
        measurementId: "G-L15LBMF6HW"
    };

    const vapidKey = "BJNATOZRMAk82-d__q2VLAT93Rf7bSEBv-ZZwYZkwRLOildfWeR8N5sxdEwmPSGblPSkWkkG6dWkoFdFOx_BYdM";

    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);

        navigator.serviceWorker.register('/firebase-messaging-sw.js')
            .then((registration) => {
                console.log('Service Worker registered:', registration);

                // SW’nin active olmasını bekle
                if (registration.active) {
                    return registration;
                } else {
                    return new Promise((resolve) => {
                        registration.addEventListener('updatefound', () => {
                            const newWorker = registration.installing;
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'activated') {
                                    resolve(registration);
                                }
                            });
                        });
                    });
                }
            })
            .then((registration) => {
                return getToken(messaging, { vapidKey, serviceWorkerRegistration: registration });
            })
            .then((token) => {
                console.log('✅ FCM Token:', token);
                localStorage.setItem("fireBaseToken", token);
            })
            .catch((err) => {
                console.error('❌ Token alınamadı:', err);
            });

        const unsubscribe = onMessage(messaging, (payload) => {
            if (payload?.notification) {
                openNotification(payload.notification.title, payload.notification.body, false);
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
                <IdsProvider>
                    <SearchProvider>
                        <AppContent />
                    </SearchProvider>
                </IdsProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;

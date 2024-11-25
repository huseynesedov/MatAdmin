import React, { createContext, useState, useContext, useEffect } from 'react';
import { AccountApi } from "./api/account.api";
import { notification } from 'antd';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

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
    const token = localStorage.getItem('token');

  
    if (storedLoggedIn && token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }

    setLoading(false);
  }, []);


  const AdminLogin = (userCode, passwordHash) => {
    setLoginLoading(true);

    AccountApi.AdminLogin({ userCode, passwordHash })
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      })
      .catch((error) => {
        setLoggedIn(false);
        setLoginLoading(false);
        openNotification('Xəta baş verdi', error.response.data.message, true);
      })
      .finally(() => {
        setLoginLoading(false);
      });
  };


  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('selectedKey');
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{
      loggedIn,
      loading,
      loginLoading,
      AdminLogin,
      logout,
      openNotification
    }}>
      {children}
    </AuthContext.Provider>
  );
};

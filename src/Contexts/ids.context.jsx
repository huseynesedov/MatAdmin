import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

const IdsCoxtext = createContext();

export const useIds = () => {
    return useContext(IdsCoxtext);
};

export const IdsProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [id, selectedId] = useState(null);


    const location = useLocation();

  // sehife deyişende stateleri sıfırlayır
  useEffect(() => {
    selectedId(null);
    setLoading(true);
  }, [location.pathname]);



    return (
        <IdsCoxtext.Provider
            value={{
                loading,
                setLoading,
                id,
                selectedId
            }}
        >
            {children}
        </IdsCoxtext.Provider>
    );
};
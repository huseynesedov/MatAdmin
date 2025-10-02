import React, { createContext, useState, useContext } from "react";

const IdsCoxtext = createContext();

export const useIds = () => {
    return useContext(IdsCoxtext);
};

export const IdsProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [id, selectedId] = useState(null);

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
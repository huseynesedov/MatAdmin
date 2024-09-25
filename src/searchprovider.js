import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <SearchContext.Provider value={{ selectedItem, setSelectedItem }}>
            {children}
        </SearchContext.Provider>
    );
};
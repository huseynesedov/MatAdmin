import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDropdownDisabled2, setIsDropdownDisabled2] = useState(true);
    const [noteDisabled2, setIsNoteDisabled2] = useState(true);
    return (
        <SearchContext.Provider value={{ selectedItem, setSelectedItem,isDropdownDisabled2,noteDisabled2 }}>
            {children}
        </SearchContext.Provider>
    );
};
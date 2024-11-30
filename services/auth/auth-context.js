import React, { createContext, useContext, useState } from 'react';

const LoggedInContext = createContext();

// Auth provider for maintaining logged-in state
export const LoggedInProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </LoggedInContext.Provider>
    );
};

// Custom hook for consuming the context
export const useLoggedIn = () => useContext(LoggedInContext);
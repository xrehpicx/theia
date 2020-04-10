import React, { useState, createContext } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const authState = useState(true);
    const theiaState = useState(false);
    return (<AuthContext.Provider value={[...authState, ...theiaState]}>{children}</AuthContext.Provider>)
}
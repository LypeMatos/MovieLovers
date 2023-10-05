import { createContext, } from "react";
//import useAuth from "../hooks/useAuth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    let authenticated = false;

    if (!authenticated) authenticated = true;
    return (
        <AuthContext.Provider value={authenticated}>
            {children}
        </AuthContext.Provider>
    )
}
import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        // onAuthStateChangeed

        setTimeout(() => {
            setIsAuthenticated(false)
        })
    }, [], 3000);

    async function login(email, password) {
        try {
            
        } catch (error) {
            
        }
    }

    async function logout() {
        try {
            
        } catch (error) {
            
        }
    }

    async function register(name, email, password, confirmPassword) {
        try {
            
        } catch (error) {
            
        }
    }

    return (
        //All the state and function that will be received in the children components should be the value
        <AuthContext.Provider value={{user, isAuthenticated, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error("useAuth must be wrapped inside AuthContextProvider");
    }

    return value;
}
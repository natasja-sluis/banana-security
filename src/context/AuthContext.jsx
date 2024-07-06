import React, {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({});



function AuthContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    function logIn() {
        setIsAuthenticated(true);
        console.log("De gebruiker is ingelogd!");
        navigate("/profile");
    }

    function logOut() {
        setIsAuthenticated(false);
        console.log("De gebruiker is uitgelogd!");
        navigate("/");
    }

    const data = {
        isAuthenticated,
        logIn,
        logOut,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
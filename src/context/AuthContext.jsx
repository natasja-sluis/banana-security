import React, {createContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import isTokenValid from "../isTokenValid";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [isAuthenticated, toggleIsAuthenticated] = useState({
        isAuthenticated: false,
        user: null,
        status: "pending",
    });


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && isTokenValid(token)) {
            void logIn(token);
        } else {
            toggleIsAuthenticated({
                isAuthenticated: false,
                user: null,
                status: "done",
            });
        }
    }, []);

    const navigate = useNavigate();

    async function logIn(token) {
        localStorage.setItem("token", token);

        const decodedToken = jwtDecode(token);

        try {
            const response = await axios.get(`http://localhost:3000/600/users/${decodedToken.sub}`, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            toggleIsAuthenticated({
                isAuthenticated: true,
                user: {
                    email: response.data.email,
                    username: response.data.username,
                    id: response.data.id,
                },
                status: "done",
            });
            navigate("/profile");
        } catch {
            toggleIsAuthenticated({
                isAuthenticated: false,
                user: null,
                status: "done",
            })
        }
    }

    function logOut() {
        localStorage.removeItem("token");
        toggleIsAuthenticated({
            isAuthenticated: false,
            user: null,
            status: "done",
        });
        navigate("/");
    }

    const data = {
        isAuthenticated: isAuthenticated.isAuthenticated,
        user: isAuthenticated.user,
        logIn: logIn,
        logOut: logOut,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

// {isAuthenticated.status === "done" ? {children} : <p>Loading...</p>}
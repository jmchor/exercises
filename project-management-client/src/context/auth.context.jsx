// src/context/auth.context.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5005';

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [isLoading, setIsLoading] = useState(true);
        const [user, setUser] = useState(null);

        const storeToken = (token) => {
                localStorage.setItem('authToken', token);
        };

        const navigate = useNavigate();

        const authenticateUser = () => {
                //  <==  ADD
                // Get the stored token from the localStorage
                const storedToken = localStorage.getItem('authToken');

                // If the token exists in the localStorage
                if (storedToken) {
                        // We must send the JWT token in the request's "Authorization" Headers
                        axios.get(`${API_URL}/auth/verify`, { headers: { Authorization: `Bearer ${storedToken}` } })
                                .then((response) => {
                                        // If the server verifies that the JWT token is valid
                                        const authenticatedUser = response.data;
                                        // Update state variables
                                        setIsLoggedIn(true);
                                        setIsLoading(false);
                                        setUser(authenticatedUser);
                                })
                                .catch((error) => {
                                        // If the server sends an error response (invalid token)
                                        // Update state variables
                                        setIsLoggedIn(false);
                                        setIsLoading(false);
                                        setUser(null);
                                });
                } else {
                        // If the token is not available (or is removed)
                        setIsLoggedIn(false);
                        setIsLoading(false);
                        setUser(null);
                }
        };

        const removeToken = () => {
                localStorage.removeItem('authToken');
        };

        const logOutUser = () => {
                removeToken();
                // and update the state variables
                authenticateUser();
                navigate('/');
        };

        useEffect(() => {
                //  <==  ADD
                authenticateUser();
        }, []);

        return (
                <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser }}>
                        {props.children}
                </AuthContext.Provider>
        );
}

export { AuthProviderWrapper, AuthContext };

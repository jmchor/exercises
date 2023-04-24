// src/pages/LoginPage.js

import { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const API_URL = 'http://localhost:5005';

function LoginPage(props) {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [errorMessage, setErrorMessage] = useState(undefined);

        const navigate = useNavigate();

        const { storeToken, authenticateUser } = useContext(AuthContext);

        const handleEmail = (e) => setEmail(e.target.value);
        const handlePassword = (e) => setPassword(e.target.value);

        const handleLoginSubmit = (e) => {
                e.preventDefault();

                const requestBody = { email, password };

                axios.post(`${API_URL}/auth/login`, requestBody)
                        .then((res) => {
                                console.log('JWT token', res.data.authToken);

                                storeToken(res.data.authToken);

                                authenticateUser();
                                navigate('/');
                        })
                        .catch((err) => {
                                const errorDescription = err.response.data.message;
                                setErrorMessage(errorDescription);
                        });
        };

        return (
                <div className="LoginPage">
                        <h1>Login</h1>

                        <form onSubmit={handleLoginSubmit}>
                                <label htmlFor="email">Email:</label>
                                <input type="email" name="email" value={email} onChange={handleEmail} id="email" />

                                <label htmlFor="password">Password:</label>
                                <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={handlePassword}
                                        id="password"
                                />

                                <button type="submit">Login</button>
                        </form>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}

                        <p>Don't have an account yet?</p>
                        <Link to="/signup"> Sign Up</Link>
                </div>
        );
}

export default LoginPage;

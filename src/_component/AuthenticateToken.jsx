import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { AUTHENTICATE_CUSTOMER } from './graphql/Query.jsx';

const AuthenticateToken = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(AUTHENTICATE_CUSTOMER, {
        context: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    });

    useEffect(() => {
        // Check if the token is present in the local storage
        const token = localStorage.getItem('token');

        if (token) {
            // Use the GraphQL query to fetch the customer data
            if (!loading && !error && data) {
                console.log(data);
                setIsAuthenticated(true);
                // setCustomerData(data.customer);
            } else if (error) {
                console.log(error.message);
                // If the token is invalid, logout the user
                // localStorage.removeItem('token');.
                navigate('/login');
            }
        } 
    }, [location.pathname, navigate, loading, error, data]);

    return isAuthenticated ? (
        // Render the content of the page if the user is authenticated
        <div>Authenticated</div>
    ) : (
        // Render a loading or error message while the authentication is in progress
        <div>No logged...</div>
    );
};

export default AuthenticateToken;
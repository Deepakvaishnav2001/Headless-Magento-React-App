import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { AUTHENTICATE_CUSTOMER } from './graphql/Query.jsx';

const AuthenticateToken = () => {

    //use router.push and customhook to replace this component
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
            if (error) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        } 
    }, [location.pathname, navigate, loading, error, data]);

};

export default AuthenticateToken;
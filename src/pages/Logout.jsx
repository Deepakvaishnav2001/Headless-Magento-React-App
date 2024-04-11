import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const logout = () => {

        localStorage.removeItem('token');
        navigate('/');
    }
    
    return (
        <>
        {logout}
        </>
    );
};

export default Logout;

import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { userContext } from '../../App';

const PrivateRoute = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const location = useLocation();
    const auth = loggedInUser.email; 
    return auth ? <Outlet />
    : <Navigate to="/login" replace state={{from: location}}/>;
};

export default PrivateRoute;
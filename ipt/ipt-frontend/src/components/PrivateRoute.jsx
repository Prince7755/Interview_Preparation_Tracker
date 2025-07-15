import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function PrivateRoute({ children }){
    const { isLoggedIn } = useContext(AuthContext);

    if(!isLoggedIn){
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default PrivateRoute;
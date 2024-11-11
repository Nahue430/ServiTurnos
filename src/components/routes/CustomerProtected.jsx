import React from 'react';
import { AuthenticationContext } from '../../context/authenticationContext/AuthenticationContext';
import getClaimsFromToken from '../helper/getClaims';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';

const CustomerProtected = ({children}) => {
    const { user } = useContext(AuthenticationContext);
    if (user == null) {
        return <Navigate to="/login" />
    }
    const TypeCustomer = getClaimsFromToken(user).TypeCustomer;
    if(TypeCustomer !== 'Customer'){
        localStorage.removeItem("token");
        return <Navigate to="/" />
    }
    return <div>{children}</div>
};


export default CustomerProtected;
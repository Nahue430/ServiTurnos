import React from 'react';
import { AuthenticationContext } from '../../context/authenticationContext/AuthenticationContext';
import getClaimsFromToken from '../helper/getClaims';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';

const CustomerProtected = ({children}) => {
    // Recuperamos el user del contexto
    const { user } = useContext(AuthenticationContext);
    if (user == null) {
        return <Navigate to="/login" />
    }
    const TypeCustomer = getClaimsFromToken(user).TypeCustomer;
    if (TypeCustomer === 'Customer') {
        // Redirige a homeclient si es de tipo Customer
        return <Navigate to="/homeclient" />; 
    } else if (TypeCustomer !== 'Professional') {
        // Redirige al login si no es ni Professional ni Customer
        return <Navigate to="/login" />; 
    }
 // Renderiza los children si es de tipo Professional
    return <>{children}</>;
};


export default CustomerProtected;
import React from 'react';
import { AuthenticationContext } from '../../context/authenticationContext/AuthenticationContext';
import getClaimsFromToken from '../helper/getClaims';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';

const AdminProtected = ({children}) => {
    // Recuperamos el user del contexto
    const { user } = useContext(AuthenticationContext);
    if (user == null) {
        return <Navigate to="/login" />
    }
    const TypeCustomer = getClaimsFromToken(user).TypeCustomer;
    if(TypeCustomer !== 'SuperAdmin'){
        return <Navigate to="/login" />
    }
    return <div>{children}</div> // Ejemplo
};


export default AdminProtected;
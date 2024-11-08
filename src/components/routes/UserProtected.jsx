
import React, {useContext} from 'react';
import {AuthenticationContext} from '../../context/authenticationContext/AuthenticationContext';
import {Navigate} from 'react-router-dom';

const UserProtected = ({children}) => {
    const {user} = useContext(AuthenticationContext);
    if(user === null) {
        return <Navigate to="/login"/>;
    }
    return <div>{children}</div>
}

export default UserProtected;
import React from 'react';
import { logout } from '../actions/auth';

const Logout = ({logoutCurrentUser}) => {
    logout(logoutCurrentUser);
                 
    return (
        <div>
            <h1>You have been successfully logged out!</h1>
        </div>
    )
}

export default Logout;
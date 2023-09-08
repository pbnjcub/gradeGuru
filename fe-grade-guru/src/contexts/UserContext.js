import React, { useState, useEffect, createContext } from "react";
import { getCurrentUser } from '../actions/auth';

const UserContext = createContext();

function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false)

    const handleCurrentUser = (user) => {
        if (user && user.email) {
            setCurrentUser(user);
            setLoggedIn(true);
        } else {
            setCurrentUser(null);
            setLoggedIn(false);
        }
    };
    
    const logoutCurrentUser = () => {
        setCurrentUser(null);
        setLoggedIn(false);
    };
    

    useEffect(() => {
        async function loadCurrentUser() {
            const user = await getCurrentUser();
            
            if (user) {
                setCurrentUser(user);
                setLoggedIn(true)
            } else {
                console.error("Error fetching user.");
                setLoggedIn(false)
            }
            
            setLoading(false);
        }

        loadCurrentUser();
    }, []);

    const refreshCurrentUser = async () => {
        setLoading(true);
        const user = await getCurrentUser();
    
        if (user) {
            setCurrentUser(user);
            setLoggedIn(true);
        } else {
            console.error("Error fetching user.");
            setCurrentUser(null);
            setLoggedIn(false);
        }
    
        setLoading(false);
    };
    

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, handleCurrentUser, logoutCurrentUser, refreshCurrentUser, loading, loggedIn }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };

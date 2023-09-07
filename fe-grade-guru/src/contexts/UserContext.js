import React, { useState, useEffect } from "react";

const UserContext = React.createContext();

function UserProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add this line

    const getCurrentUser = () => {
        fetch('/current-user', {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          credentials: 'include',
          mode: 'cors'
        })
        .then((resp) => {
            if(resp.ok) {
                return resp.json()
                .then((user) => {
                    setCurrentUser(user);
                    setLoading(false)
                })
            } 
        })
    };

    useEffect(getCurrentUser, []);
    
    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, getCurrentUser, loading, loggedIn: Boolean(currentUser) }}>
          {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider};

import React, { useState, useEffect, createContext, useContext } from "react";
import { getUsers } from '../actions/users';
import { UserContext } from './UserContext'; // Ensure the correct path

const AdminContext = createContext();

function AdminProvider({ children }) {
    const { currentUser } = useContext(UserContext);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            if (currentUser && currentUser.role === 'admin') {
                const fetchedUsers = await getUsers();
                
                if (fetchedUsers) {
                    setAllUsers(fetchedUsers);
                } else {
                    console.error("Error fetching all users.");
                }
            }
            setLoading(false);
        }

        fetchUsers();
    }, [currentUser]);

    return (
        <AdminContext.Provider value={{ allUsers, setAllUsers, loading }}>
            {children}
        </AdminContext.Provider>
    );
}

export { AdminContext, AdminProvider };

import React, { useState, useEffect, createContext, useContext } from "react";
import { getUnitsForTeacher } from '../actions/teachers';
import { UserContext } from './UserContext'; // Ensure the correct path

const UnitsContext = createContext();

function UnitsProvider({ children }) {
    const { currentUser } = useContext(UserContext);
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUnits() {
            if (currentUser && currentUser.role === 'teacher') {
                const fetchedUnits = await getUnitsForTeacher(currentUser.id);
                
                if (fetchedUnits) {
                    setUnits(fetchedUnits);
                } else {
                    console.error("Error fetching units.");
                }
            }
            setLoading(false);
        }

        fetchUnits();
    }, [currentUser]);

    const addUnit = (newUnit) => {
        setUnits(prevUnits => [...prevUnits, newUnit]);
      }

    return (
        <UnitsContext.Provider value={{ units, setUnits, addUnit, loading, setLoading }}>
            {children}
        </UnitsContext.Provider>
    );
}

export { UnitsContext, UnitsProvider };

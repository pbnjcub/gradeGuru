import React, { useState, useEffect, createContext, useContext } from "react";
import { getStudentsForTeacher } from '../actions/teachers';
import { UserContext } from './UserContext'; // Ensure the correct path

const StudentsContext = createContext();

function StudentsProvider({ children }) {
    const { currentUser } = useContext(UserContext);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStudents() {
            if (currentUser && currentUser.role === 'teacher') {
                const fetchedStudents = await getStudentsForTeacher(currentUser.id);
                
                if (fetchedStudents) {
                    setStudents(fetchedStudents);
                } else {
                    console.error("Error fetching students.");
                }
            }
            setLoading(false);
        }

        fetchStudents();
    }, [currentUser]);



    return (
        <StudentsContext.Provider value={{ students, setStudents, loading }}>
            {children}
        </StudentsContext.Provider>
    );
}

export { StudentsContext, StudentsProvider };

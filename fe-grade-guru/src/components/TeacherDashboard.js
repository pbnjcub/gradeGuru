import React, { useState, useEffect } from 'react';
import userContext from './UserContext';
import { getStudentsForTeacher } from '../actions/teachers';

const TeacherDashboard = () => {
    const { currentUser } = React.useContext(userContext);
//     const [students, setStudents] = useState([]);

//   useEffect(() => {
//     // Fetch the list of students for the logged-in teacher when the component mounts
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await getStudentsForTeacher();
//       if (response.ok) {
//         const data = await response.json();
//         setStudents(data); // Update the students state with the fetched data
//       } else {
//         // Handle error if needed
//         console.error('Failed to fetch students:', response.statusText);
//       }
//     } catch (error) {
//       // Handle error if needed
//       console.error('Error fetching students:', error);
//     }
//   };

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <h2>Students List:</h2>
      {/* <ul>
        {students.map((student) => (
          <li key={student.id}>{`${student.first_name} ${student.last_name}`}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default TeacherDashboard;

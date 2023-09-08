import React, { useState, useContext } from 'react';
import { UserContext } from "../contexts/UserContext"
import { StudentsContext } from "../contexts/StudentsForTeacherContext"
import StudentLink from './StudentLink';
import '../styling/TeacherView.css'


const TeacherDashboard = () => {
  const { currentUser, loading: userLoading } = useContext(UserContext);
  const {students, loading: studentsLoading } = useContext(StudentsContext)
  const [errorMessages, setErrorMessages] = useState([]);
  
 console.log(students)
  const sortUsers = (users) => {
    const sorted = users.sort((a,b) => {
      const sortByLastName = a.last_name.localeCompare(b.last_name);
      if (sortByLastName !== 0) {
        return sortByLastName;
      } else {
        return a.first_name.localeCompare(b.first_name);
      }
    })
    return sorted
  } 

  const studentList = students.map((student) => <StudentLink key={student.id} student={student} />);
  
  const renderErrors = errorMessages.map((message, index) => <div className="container"><h3 key={index} className="error">{message}</h3></div>);

  const noStudents = students.length === 0;

  
  if (userLoading || studentsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Teacher Dashboard</h1>
      <h4>Teacher: {currentUser ? `${currentUser.last_name}, ${currentUser.first_name}` : 'Loading...'}</h4>
      <br/>
      {renderErrors}
      <div>
        <table className="pure-table pure-table-horizontal">
          <thead>
            <tr>
              <th>Student</th>
            </tr>
          </thead>
          <tbody>
            {noStudents ? <tr><td>No Enrolled Students</td></tr> : studentList}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default TeacherDashboard;

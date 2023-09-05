import React, { useState, useEffect } from 'react';
import userContext from './UserContext';
import { getStudentsForTeacher } from '../actions/teachers';
import StudentLink from './StudentLink';
import '../styling/TeacherView.css'


const TeacherDashboard = () => {
    const { currentUser } = React.useContext(userContext);
    const [students, setStudents] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);

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

  useEffect(() => {
    fetchStudents(currentUser.id);
  }, [currentUser.id]);

  const fetchStudents = (id) => {
    getStudentsForTeacher(id)
      .then((data) => {
        setStudents(sortUsers(data));
      })
      .catch((error) => {
        setErrorMessages(error);
      })
  };

  const studentList = students.map((student) => <StudentLink key={student.id} student={student} />);
  const renderErrors = errorMessages.map((message, index) => <div className="container"><h3 key={index} className="error">{message}</h3></div>);

  return (
    <div className="container">
      <h1>Teacher Dashboard</h1>
      <h4>Teacher: {currentUser.last_name}, {currentUser.first_name}</h4>
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
            {studentList}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherDashboard;

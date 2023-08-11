import React, { useState, useEffect } from 'react';
import userContext from './UserContext';
import { getStudentsForTeacher } from '../actions/teachers';
import StudentLink from './StudentLink';

const TeacherDashboard = () => {
    const { currentUser } = React.useContext(userContext);
    const [students, setStudents] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    fetchStudents(currentUser.id);
  }, [currentUser.id]);

  const fetchStudents = (id) => {
    getStudentsForTeacher(id)
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        setErrorMessages(error);
      })
  };



  const studentList = students.map((student) => <StudentLink key={student.id} student={student} />);

  const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);


  return (
<div className="main" style={{marginLeft: '50px'}}>
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

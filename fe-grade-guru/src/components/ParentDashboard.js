import React, { useState, useEffect } from 'react';
import userContext from './UserContext';
import { getStudentsForParent } from '../actions/parents';
import StudentLink from './StudentLink';

const ParentDashboard = () => {
    const { currentUser } = React.useContext(userContext);
    const [students, setStudents] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    fetchStudents(currentUser.id);
  }, [currentUser.id]);

  const fetchStudents = (id) => {
    getStudentsForParent(id)

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
      <h1>Parent Dashboard</h1>
      <h4>Parent: {currentUser.last_name}, {currentUser.first_name}</h4>
      <br/>
      {renderErrors}
      <div>
        <table className="pure-table pure-table-horizontal">
          <thead>
            <tr>
              <th>Family Members</th>
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

export default ParentDashboard;

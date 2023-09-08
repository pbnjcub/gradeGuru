import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../contexts/UserContext"
import { getStudentsForParent } from '../actions/parents';
import StudentLink from './StudentLink';

const ParentDashboard = () => {
  const { currentUser, loading } = useContext(UserContext);
  const [students, setStudents] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        setIsFetching(true);
        setErrorMessages([])

        const data = await getStudentsForParent(currentUser.id);
        console.log(data)
        if (data) {
          setStudents(data)
        } else {
          setErrorMessages(['Failed to fetch students.']);
        }
        setIsFetching(false)
      }
    }
    fetchData()
  }, [currentUser]);

  console.log(students)
  const studentList = students.map((student) => <StudentLink key={student.student.id} student={student} />);

  const renderErrors = errorMessages.map((message, index) => <p key={index} id="error">{message}</p>);

  if (isFetching || loading) {
    return <div>Loading...</div>;
  }

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

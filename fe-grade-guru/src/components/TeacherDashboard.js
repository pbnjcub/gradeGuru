import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../contexts/UserContext"
import { getStudentsForTeacher } from '../actions/teachers';
import StudentLink from './StudentLink';
import '../styling/TeacherView.css'


const TeacherDashboard = () => {
  const { currentUser, loading } = useContext(UserContext);
  const [students, setStudents] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [isFetching, setIsFetching] = useState(true)

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
    async function fetchData() {
      if (currentUser) {
        setIsFetching(true);
        setErrorMessages([])
        
        const data = await getStudentsForTeacher(currentUser.id);

        if (data) {
          setStudents(sortUsers(data));
        } else {
          setErrorMessages(['Failed to fetch students.']);
        }
        setIsFetching(false)
    }
  }
  fetchData()
}, [currentUser]);

  const studentList = students.map((student) => <StudentLink key={student.id} student={student} />);
  
  const renderErrors = errorMessages.map((message, index) => <div className="container"><h3 key={index} className="error">{message}</h3></div>);

  if (loading) {
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
            {studentList}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherDashboard;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDataForStudent } from '../actions/students';
import UserContext from './UserContext';
import StudentDataView from './StudentDataView';

const ParentViewStudentData = ({ }) => {
  const { currentUser } = React.useContext(UserContext);
  console.log(currentUser.id)
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessages, setErrorMessages] = useState([])
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentStudentUnits, setCurrentStudentUnits] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        setIsLoading(true);
        setErrorMessages([]);

        const data = await getDataForStudent(id);

        if (data) {
          setCurrentStudent(data.student);
          setCurrentStudentUnits(data.sorted_units);
        } else {
          setErrorMessages(['Failed to fetch student data.']);
        }
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const unitList = currentStudentUnits.map(unit => (
    <StudentDataView key={unit.id} unit={unit} currentStudent={currentStudent} />
  ));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (errorMessages.length > 0) {
    return <p>Error: {errorMessages.join(', ')}</p>;
  }

  return (
    <div className="main" style={{ marginLeft: '50px' }}>
      <h1>Student Report for {currentStudent.first_name} {currentStudent.last_name}</h1>
      <br />
      <h3>Grades and Feedback</h3>
      <table className="pure-table pure-table-horizontal">
        <thead>
          <tr>
            <th rowSpan="2" colSpan="2">Unit</th>
            <th colSpan="4">Feedbacks</th>
            <th rowSpan="2">Academic Skills</th>
            <th rowSpan="2">Actions</th>
          </tr>
          <tr>
            <td>Written Work</td>
            <td>Classwork</td>
            <td>Homework</td>
            <td>Comment</td>
          </tr>
        </thead>
        <tbody>
          {unitList}
        </tbody>
      </table>
      <br />
    </div>
  );
};

export default ParentViewStudentData;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGradesAndFeedbacksForStudent } from '../actions/students';
import UserContext from './UserContext';
import UnitGradesAndFeedbacks from './UnitGradesAndFeedbacks';
import { updateStudentFeedbacks } from '../actions/students';

const StudentDetail = () => {
  // state variables
  const { teacher_id, student_id } = useParams();
  const { currentUser } = React.useContext(UserContext);
  const [student, setStudent] = useState({});
  const [units, setUnits] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    getGradesAndFeedbacksForStudent(teacher_id, student_id)
      .then((data) => {
        if (data.errors) {
          setErrorMessages(data.errors);
        } else {
          setStudent(data.student);
          setUnits(data.units_with_skill_and_feedback);
        }
      })
      .catch((error) => {
        setErrorMessages([error.message]);
      });
  }, [teacher_id, student_id]);




  const unitList = units.map((unit) => <UnitGradesAndFeedbacks key={unit.id} unit={unit} />);
  
  const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);

  return (
<div className="main" style={{marginLeft: '50px'}}>
      <h1>Student Report for {student.first_name} {student.last_name} </h1>
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

export default StudentDetail;

import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getGradesAndFeedbacksForStudent } from '../actions/students';
import UserContext from './UserContext';
import UnitGradesAndFeedbacks from './UnitGradesAndFeedbacks';

const StudentDetail = () => {
    //state variables
    const { teacher_id, student_id } = useParams();
    const {currentUser} = React.useContext(UserContext);
    const [student, setStudent] = useState({});
    const [units, setUnits] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);

  // Fetch grades and feedbacks data
  useEffect(() => {
    getGradesAndFeedbacksForStudent(teacher_id, student_id) // Replace unitId with the ID of the unit you want to fetch data for
      .then((data) => {
        console.log(data)
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

  console.log(student)
  console.log(units)

  const unitList = units.map((unit) => <UnitGradesAndFeedbacks key={unit.id} unit={unit} />);

  const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);



      
    return (
    <div className="main">
      <h1>Student Report for {student.first_name} {student.last_name} </h1>
      <br />
      <h3>Grades and Feedback</h3>
      <table className="pure-table pure-table-horizontal">
        <thead>
          <tr>
            <th rowSpan = "2" colSpan = "2">Unit</th>
            <th colSpan = "4">Student as Learner</th>
            <th colSpan = "4">Academic Skills</th>
          </tr>
          <tr>
            {/* <th>Unit Name</th>
            <th>Description</th> */}
            <th>Written Work</th>
            <th>Classwork</th>
            <th>Homework</th>
            <th>Comment</th>
          </tr>
        </thead>

        <tbody>
          {unitList}
        </tbody>
      </table>
      <br />

    </div>
  );
}
  
  export default StudentDetail;



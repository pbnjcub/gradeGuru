import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getGradesAndFeedbacksForStudent } from '../actions/students';
import UserContext from './UserContext';

const TeacherStudentDetail = () => {
    //state variables
    const { id } = useParams();
    const {currentUser} = React.useContext(UserContext);
    const [gradesAndFeedbacks, setGradesAndFeedbacks] = useState([]);
    // const [selectedStudent, setSelectedStudent] = useState([]);

  // Fetch grades and feedbacks data
  // useEffect(() => {
  //   getGradesAndFeedbacksForStudent(id, unitId) // Replace unitId with the ID of the unit you want to fetch data for
  //     .then((data) => {
  //       if (data.errors) {
  //         setErrorMessages(data.errors);
  //       } else {
  //         setGradesAndFeedbacks(data);
  //         console.log(data)
  //       }
  //     })
  //     .catch((error) => {
  //       setErrorMessages([error.message]);
  //     });
  // }, [id]);
      
      return (
      <div className="main">
        <h1>Student Report for </h1>
        <br />
        <h3>Enrolled Courses</h3>
        <table className="pure-table pure-table-horizontal">
          <thead>
            <tr>
              <th>Course</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
        <br />
        <h3>Feedback</h3>
      </div>
    );
  }
  
  export default TeacherStudentDetail;



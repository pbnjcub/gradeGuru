import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import userContext from './UserContext';
import { updateStudentFeedbacks } from '../actions/students';

const FeedbackForm = ({handleEditFeedback}) => {
    const { currentUser } = React.useContext(userContext)
    const navigate = useNavigate();
    const location = useLocation()
    const { unit, params} = location.state
    const teacher_id = currentUser.id
    const student_id = params.student_id
    const student_first_name = params.student_first_name
    const student_last_name = params.student_last_name
    console.log(params)

    const [errorMessages, setErrorMessages] = useState([]);
    
    const [updatedFeedbacks, setUpdatedFeedbacks] = useState({
        id: unit.feedbacks[0].id,
        written_work: unit.feedbacks[0].written_work,
        classwork: unit.feedbacks[0].classwork,
        homework: unit.feedbacks[0].homework,
        comment: unit.feedbacks[0].comment,
      });


      const handleInputChange = (e) => {
        setUpdatedFeedbacks({ ...updatedFeedbacks, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedFeedbacksData = {
          id: updatedFeedbacks.id,
          written_work: updatedFeedbacks.written_work,
          classwork: updatedFeedbacks.classwork,
          homework: updatedFeedbacks.homework,
          comment: updatedFeedbacks.comment,
        };

        const resp = await updateStudentFeedbacks(teacher_id, student_id, updatedFeedbacksData)
          if (resp.errors) {
            setErrorMessages(resp.errors.errors);
          } else {
            setErrorMessages([])
            handleEditFeedback(unit.unit.id, updatedFeedbacksData);
            navigate(`/teachers/${teacher_id}/students/${student_id}`);
          }
        };

        // updateStudentFeedbacks(teacher_id, student_id, updatedFeedbacksData)
        //   .then((data) => {
        //     if (data.errors) {
        //       setErrorMessages(data.errors);
        //     } else {
        //       handleEditFeedback(unit.unit.id, updatedFeedbacksData);
        //     }
        //   })
        //   .finally(() => {
        //     console.log("Updated Feedbacks after API call:", updatedFeedbacks); // Add this line
        //     navigate(`/teachers/${teacher_id}/students/${student_id}`);
        //   });


        const renderErrors = errorMessages.map((message, index) => <p key={index} id="error">{message}</p>);

  
    return (
      <form onSubmit={handleSubmit} style={{marginLeft: '50px'}}>
      <h1>Feedback Edit Form for: {student_first_name} {student_last_name} </h1>
      <h5>{renderErrors}</h5>
      <table>
        <thead>
          <tr>
            <th>Unit Title</th>
            <th>Description</th>
            <th>Written Work</th>
            <th>Classwork</th>
            <th>Homework</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{unit.unit.title}</td>
            <td>{unit.unit.description}</td>
            <td>
              <input type="number" name="written_work" value={updatedFeedbacks.written_work} onChange={handleInputChange} style={{ width: "100px"}}/>
            </td>
            <td>
              <input type="number" name="classwork" value={updatedFeedbacks.classwork} onChange={handleInputChange} style={{ width: "100px"}}/>
            </td>
            <td>
              <input type="number" name="homework" value={updatedFeedbacks.homework} onChange={handleInputChange} style={{ width: "100px"}}/>
            </td>
            <td>
              <input type="text" name="comment" value={updatedFeedbacks.comment} onChange={handleInputChange} style={{ width: "375px"}}/>
            </td>
            <td>
              <button className="pure-button pure-button-primary" type="submit">
                Update
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default FeedbackForm;

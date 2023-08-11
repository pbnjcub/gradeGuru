import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import userContext from './UserContext';
import { updateStudentFeedbacks } from '../actions/students';

const FeedbackForm = ({handleFeedbackUpdate}) => {
    const { currentUser } = React.useContext(userContext)
    const navigate = useNavigate();
    const location = useLocation()
    const { unit, params} = location.state
    const teacher_id = currentUser.id
    const student_id = params.student_id

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

      const handleSubmit = (e) => {
        e.preventDefault();
        updateStudentFeedbacks(teacher_id, student_id, updatedFeedbacks)
          .then((data) => {
            if (data.errors) {
              setErrorMessages(data.errors);
            } else {
              handleFeedbackUpdate(unit.unit.id, updatedFeedbacks)
          }
        });
        navigate(`/teachers/${teacher_id}/students/${student_id}`)
      };

  
    return (
      <form onSubmit={handleSubmit} style={{marginLeft: '50px'}}>
      <h1>Feedback Edit Form</h1>
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
              <input
                type="text"
                name="written_work"
                value={updatedFeedbacks.written_work}
                onChange={handleInputChange}
                style={{ width: "100px"}}
              />
            </td>
            <td>
              <input
                type="text"
                name="classwork"
                value={updatedFeedbacks.classwork}
                onChange={handleInputChange}
                style={{ width: "100px"}}
              />
            </td>
            <td>
              <input
                type="text"
                name="homework"
                value={updatedFeedbacks.homework}
                onChange={handleInputChange}
                style={{ width: "100px"}}
              />
            </td>
            <td>
              <input
                type="text"
                name="comment"
                value={updatedFeedbacks.comment}
                onChange={handleInputChange}
                style={{ width: "375px"}}
              />
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

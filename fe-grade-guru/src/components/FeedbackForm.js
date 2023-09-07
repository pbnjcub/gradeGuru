import React, { useContext } from 'react';
import { UserContext } from "../contexts/UserContext"
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateStudentFeedbacks } from '../actions/students';
import '../styling/TeacherView.css'

const FeedbackForm = ({handleEditFeedback}) => {
  const { currentUser, loading } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation()
    const { unit, params} = location.state
    const teacher_id = currentUser.id
    const student_id = params.student_id
    const student_first_name = params.student_first_name
    const student_last_name = params.student_last_name

    const [errorMessages, setErrorMessages] = useState([]);
    
    const [updatedFeedbacks, setUpdatedFeedbacks] = useState({
        id: unit.feedbacks[0].id,
        written_work: unit.feedbacks[0].written_work || "",
        classwork: unit.feedbacks[0].classwork || "",
        homework: unit.feedbacks[0].homework || "",
        comment: unit.feedbacks[0].comment || "",
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
        setErrorMessages(resp.errors);
      } else {
        setErrorMessages([])
        handleEditFeedback(unit.unit.id, updatedFeedbacksData);
        navigate(`/teachers/${teacher_id}/students/${student_id}`);
      }
    };

    const handleCancel = () => {
      navigate(`/teachers/${teacher_id}/students/${student_id}`);
    };

    const renderErrors = errorMessages.map((message, index) => <div className="container"><h3 key={index} className="error">{message}</h3></div>);

    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="container">
      <form onSubmit={handleSubmit}>
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
              <button className="pure-button" type="submit">
                Update
              </button>
              <button className="pure-button" type="button" onClick={handleCancel}>
          Cancel
        </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    </div>
  );
};

export default FeedbackForm;

import React, { useState } from 'react';
import userContext from './UserContext';
import { useNavigate } from 'react-router-dom';

const SkillsAndGrades = ({ unit }) => {
  const { currentUser } = React.useContext(userContext)
  const unitFeedbacks = unit.feedbacks[0];
  const current_unit = unit.unit;
  const teacher_id = currentUser.teacher_id;
  const feedback_id = unit.feedbacks[0].id;
  const student_id = unit.feedbacks[0].student_id;
  const unit_skills = unit.skills;
  const [showSkillsAndGrades, setShowSkillsAndGrades] = useState(false); 
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState([]);



  const toggleSkillsAndGrades = () => {
    setShowSkillsAndGrades(!showSkillsAndGrades);
  };



  const navigateToFeedbackUpdate = () => {
    const params = {
      // handleFeedbackUpdate: handleFeedbackUpdate,
      unit_title: current_unit.title,
      unit_description: current_unit.description,
      unit_id: current_unit.id,
      teacher_id: teacher_id,
      student_id: student_id
    }
    navigate(`/teachers/${currentUser.id}/students/${student_id}/feedbacks/${feedback_id}`, {
      state: { unit, params }
    });
  };

  return (
    <>
        <tr>
          <td>{current_unit.title}</td>
          <td>{current_unit.description}</td>
          <td>{unitFeedbacks.written_work}</td>
          <td>{unitFeedbacks.classwork}</td>
          <td>{unitFeedbacks.homework}</td>
          <td>{unitFeedbacks.comment}</td>
          <td>
            <button className="pure-button pure-button-primary" onClick={toggleSkillsAndGrades}>
              Skills
            </button>
          </td>
          <td>
          <button className="pure-button pure-button-primary" onClick={navigateToFeedbackUpdate}>
            Update Feedback
          </button>
        </td>
        </tr>
      {showSkillsAndGrades ? (
        <tr>
          <td colSpan="7">
            <div>
              <h3>Unit Skills</h3>
              {unit_skills.map((skill) => (
                <div key={skill.skill.id}>
                  <h4>{skill.skill.title}</h4>
                  <p>Grade: {skill.grade}</p>
                </div>
              ))}
            </div>
          </td>
        </tr>
      ) : null}
    </>
  );
};

export default SkillsAndGrades;

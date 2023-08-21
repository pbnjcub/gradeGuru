import React, { useState } from 'react';
import userContext from './UserContext';
import { useNavigate } from 'react-router-dom';
import {updateStudentSkillGrades} from '../actions/students';

const SkillsAndGrades = ({ unit, handleEditSkillsGrade }) => {
  const { currentUser } = React.useContext(userContext);
  const unitFeedbacks = unit.feedbacks[0];
  const current_unit = unit.unit;
  const teacher_id = currentUser.id;
  const feedback_id = unit.feedbacks[0].id;
  const student_id = unit.feedbacks[0].student_id;
  const unit_skills = unit.skills;
  const [showSkillsAndGrades, setShowSkillsAndGrades] = useState(false);
  const [editingSkills, setEditingSkills] = useState(false);
  const [updatedSkills, setUpdatedSkills] = useState([...unit.skills]);
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState([]);

  const toggleSkillsAndGrades = () => {
    setShowSkillsAndGrades(!showSkillsAndGrades);
  };

  const toggleEditSkills = () => {
    setEditingSkills(!editingSkills);
  };
  
  const handleSkillGradeChange = (e, index) => {
    const updatedSkill = {
      ...updatedSkills[index],
      grade: {                 
        ...updatedSkills[index].grade,
        grade: parseInt(e.target.value)
      }
    };
    
    const updatedSkillsCopy = [...updatedSkills];
    updatedSkillsCopy[index] = updatedSkill;
    setUpdatedSkills(updatedSkillsCopy);
  };
  
  
  
  const updateSkills = () => {
    updateStudentSkillGrades(teacher_id, student_id, updatedSkills)
      .then((data) => {
        if (data.error) {
          setErrorMessages(data.error);
        } else {
          setEditingSkills(false);
          handleEditSkillsGrade(updatedSkills)
        }
      })
  };

  const skillList = unit_skills.map((skill) => (
    <div key={skill.skill.id}>
      <h4>{skill.skill.title}</h4>
      <p>Grade: {skill.grade.grade}</p>
    </div>
  ));

  const skillListEdit = updatedSkills.map((skill, index) => {
    const skill_title = skill.skill.title.toLowerCase().replace(/\s/g, "_")

    return (
      <div key={skill.skill.id}>
        <h4>{skill.skill.title}</h4>
        <input type="number" name={skill_title} value={skill.grade.grade} onChange={(e) => handleSkillGradeChange(e, index)}/>
      </div>
    )
  })

  const navigateToFeedbackUpdate = () => {
    const params = {
      unit_title: current_unit.title,
      unit_description: current_unit.description,
      unit_id: current_unit.id,
      teacher_id: teacher_id,
      student_id: student_id,
    };
    navigate(`/teachers/${currentUser.id}/students/${student_id}/feedbacks/${feedback_id}`, {
      state: { unit, params },
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
          {showSkillsAndGrades ? (
            <button className="pure-button pure-button-primary" onClick={toggleSkillsAndGrades}>
              Close Skills
            </button>
          ) : 
            <button className="pure-button pure-button-primary" onClick={toggleSkillsAndGrades}>
              View Skills
            </button>
          }
        </td>
        <td>
          <button className="pure-button pure-button-primary" onClick={navigateToFeedbackUpdate}>
            Update Feedback
          </button>
        </td>
        {/* <td>
          <button className="pure-button pure-button-primary">
            Delete Feedback
          </button>
        </td> */}
      </tr>
      {showSkillsAndGrades && !editingSkills ? (
        <tr>
          <td colSpan="7">
            <div>
              <h3>Unit Skills</h3>
              {skillList}
              <button className="pure-button pure-button-primary" onClick={toggleEditSkills}>
                Update Skills
              </button>
            </div>
          </td>
        </tr>
      ) : null}
      {editingSkills ? (
        <tr>
          <td colSpan="7">
            <div>
              <h3>Update Skills</h3>
                {skillListEdit}
              <button className="pure-button pure-button-primary" onClick={updateSkills}>
                Save Skills
              </button>
              <button className="pure-button pure-button-primary" onClick={toggleEditSkills}>
                Cancel
              </button>
            </div>
          </td>
        </tr>
      ) : null}
    </>
  );
};

export default SkillsAndGrades;

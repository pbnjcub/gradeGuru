import React, { useState } from 'react';
import userContext from './UserContext';
import { useNavigate } from 'react-router-dom';
import {updateStudentSkillGrades} from '../actions/students';
import '../styling/TeacherView.css'

const SkillsAndGrades = ({ unit, studentObj, handleEditSkillsGrade }) => {
  const { currentUser } = React.useContext(userContext);
  const unitFeedbacks = unit.feedbacks[0];
  const current_unit = unit.unit;
  const teacher_id = currentUser.id;
  const feedback_id = unit.feedbacks[0].id;
  const student_id = unit.feedbacks[0].student_id;
  const unit_skills = unit.skills;
  const student_first_name = studentObj.student.first_name
  const student_last_name = studentObj.student.last_name
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
        grade: e.target.value
      }
    };
    const updatedSkillsCopy = [...updatedSkills];
    updatedSkillsCopy[index] = updatedSkill;
    setUpdatedSkills(updatedSkillsCopy);
  };
  
  const updateSkills = () => {
    updateStudentSkillGrades(teacher_id, student_id, updatedSkills)
      .then((data) => {
        if (data.errors) {
          const errorObj = data.errors.map(errorArr => errorArr.errors)
          setErrorMessages(errorObj[0]);
        } else {
          setEditingSkills(false);
          setErrorMessages([])
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
      student_first_name: student_first_name,
      student_last_name: student_last_name,
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

  const renderErrors = errorMessages.map((message, index) => <div className="container"><h3 key={index} className="error">{message}</h3></div>);

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
      </tr>
      {showSkillsAndGrades && !editingSkills ? (
        <tr>
          <td colSpan="7">
            <div>
              <h3>Unit Skills</h3>
              {unit_skills.length > 0 ? (
                skillList
              ) : (
                <p>No skills available yet</p>
              )}
              {!editingSkills && unit_skills.length > 0 ? (
                <button className="pure-button pure-button-primary" onClick={toggleEditSkills}>
                  Update Skills
                </button>
              ) : null}
            </div>
          </td>
        </tr>
      ) : null}
      {editingSkills ? (
        <tr>
          <td colSpan="7">
            <div>
              <h3>Update Skills</h3>
              <br />
              {renderErrors}

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

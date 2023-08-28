import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDataView = ({ unit }) => {
  const unitFeedbacks = unit.feedbacks[0];
  const unitTeacher = unit.teacher;
  const current_unit = unit.unit;
  const unit_skills = unit.skills;
  const [showSkillsAndGrades, setShowSkillsAndGrades] = useState(false);
  const navigate = useNavigate();

  const toggleSkillsAndGrades = () => {
    setShowSkillsAndGrades(!showSkillsAndGrades);
  };

  const skillList = unit_skills.map((skill) => (
    <div key={skill.skill.id}>
      <h4>{skill.skill.title}</h4>
      <p>Grade: {skill.grade.grade}</p>
    </div>
  ));

  return (
    <>
      <tr>
        <td>{current_unit.title}</td>
        <td>{current_unit.description}</td>
        <td>{unitTeacher.last_name}</td>
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
      </tr>
      {showSkillsAndGrades ? (
        <tr>
          <td colSpan="7">
            <div>
              <h3>Unit Skills</h3>
              {skillList}
            </div>
          </td>
        </tr>
      ) : null}
    </>
  );
};

export default StudentDataView;


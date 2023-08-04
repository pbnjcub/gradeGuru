import React, { useState } from 'react';
import userContext from './UserContext';
import { Link } from 'react-router-dom';

const SkillsAndGrades = ({ unit }) => {
  const { currentUser } = React.useContext(userContext);
  const current_unit = unit.unit;
  const unit_feedbacks = unit.feedbacks;
  const unit_skills = unit.skills;
  const [showSkillsAndGrades, setShowSkillsAndGrades] = useState(false);

  const toggleSkillsAndGrades = () => {
    setShowSkillsAndGrades(!showSkillsAndGrades);
  };

  return (
    <>
      <tr>
        <td>{current_unit.title}</td>
        <td>{current_unit.description}</td>
        <td>{unit_feedbacks[0].written_work}</td>
        <td>{unit_feedbacks[0].classwork}</td>
        <td>{unit_feedbacks[0].homework}</td>
        <td>{unit_feedbacks[0].comment}</td>
        <td>
          <button className="pure-button pure-button-primary" onClick={toggleSkillsAndGrades}>
            Skills
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

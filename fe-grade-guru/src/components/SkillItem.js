import React from 'react';

const SkillItem = ({ skill, handleUpdateSkillClick }) => {
  return (
    <tr key={skill.id}>
      <td>{skill.title}</td>
      <td>{skill.description}</td>
      <td>
        <button className="pure-button pure-button-primary" onClick={() => handleUpdateSkillClick(skill.id)}>
          Update Skill
        </button>
      </td>
    </tr>
  );
};

export default SkillItem;

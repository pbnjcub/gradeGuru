import React from 'react';

const SkillItem = ({ unitSkill, handleUpdateSkillClick }) => {
  return (
    <tr key={unitSkill.id}>
      <td>{unitSkill.title}</td>
      <td>{unitSkill.description}</td>
      <td>
        <button className="pure-button pure-button-primary" onClick={() => handleUpdateSkillClick(unitSkill.id)}>
          Update Skill
        </button>
      </td>
    </tr>
  );
};

export default SkillItem;

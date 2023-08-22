import React from 'react';

const SkillItem = ({ unitSkill, handleUpdateSkillClick, handleDeleteUnitSkill }) => {
  return (
    <tr key={unitSkill.id}>
      <td>{unitSkill.title}</td>
      <td>{unitSkill.description}</td>
      <td>
        <button className="pure-button pure-button-primary" onClick={() => handleUpdateSkillClick(unitSkill.id)}>
          Update Skill
        </button>
      </td>
      <td>
        <button className="pure-button pure-button-primary" onClick={() => handleDeleteUnitSkill(unitSkill.id)}>
          Delete Skill
        </button>
      </td>
    </tr>
  );
};

export default SkillItem;

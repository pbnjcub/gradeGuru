import React from 'react';

const UpdateSkillItem = ({ unitSkill, updatingSkill, updatingSkillId, handleSkillChange, updateSkill, toggleEditSkills, handleUpdateSkillClick }) => {
    if (updatingSkillId === unitSkill.id) {
    return (
      <tr key={unitSkill.id}>
        <td>
          <input type="text" name={`title_${unitSkill.id}`} value={updatingSkill.title} onChange={(e) => handleSkillChange('title', e.target.value)}/>
        </td>
        <td>
          <input type="text" name={`description_${unitSkill.id}`} value={updatingSkill.description} onChange={(e) => handleSkillChange('description', e.target.value)}/>
        </td>
        <td>
          <button className="pure-button pure-button-primary" onClick={() => updateSkill(updatingSkill)}>
            Save Skill
          </button>
          <button className="pure-button pure-button-primary" onClick={toggleEditSkills}>
            Cancel
          </button>
        </td>
      </tr>
    );
  } else {
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
  }
};

export default UpdateSkillItem;

import React, { useContext } from 'react';
import { UserContext } from "../contexts/UserContext"

const SkillItem = ({ unitSkill, handleUpdateSkillClick, handleDeleteUnitSkill }) => {
  const { currentUser, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <tr key={unitSkill.id}>
      <td>{unitSkill.title}</td>
      <td>{unitSkill.description}</td>
      <td>
        <button className="pure-button" onClick={() => handleUpdateSkillClick(unitSkill.id)}>
          Update Skill
        </button>
      </td>
      <td>
        <button className="pure-button" onClick={() => handleDeleteUnitSkill(unitSkill.id)}>
          Delete Skill
        </button>
      </td>
    </tr>
  );
};

export default SkillItem;

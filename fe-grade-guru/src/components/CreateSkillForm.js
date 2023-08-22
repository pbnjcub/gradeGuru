import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateSkillForm = ({teacher_id, unitObj, newUnitSkill, setNewUnitSkill, handleNewUnitSkill, toggleNewSkill}) => {
    const navigate = useNavigate();
    const unit_id = unitObj.id;
    
    const handleChange = (e) => {
        setNewUnitSkill({ ...newUnitSkill, [e.target.name]: e.target.value });
    };

    const handleSkillSubmit = (newUnitSkill) => {
        handleNewUnitSkill(newUnitSkill);
        setNewUnitSkill({
            title: "",
            description: "",
            unit_id: unitObj.id,
        });
        toggleNewSkill()
        navigate(`/teachers/${teacher_id}/units/${unit_id}`);

    };
    
    return (
        <div>
            <h3>New Unit Skill Form</h3>
                <label>Title: </label>
                <input type="text" name="title" value={newUnitSkill.title} onChange={handleChange} />
                <label>Description: </label>
                <input type="text" name="description" value={newUnitSkill.description} onChange={handleChange} />

                <button className="pure-button pure-button-primary" onClick={() => handleSkillSubmit(newUnitSkill)}>Add Skill</button>
                <button className="pure-button pure-button-primary" onClick={toggleNewSkill}>Cancel</button>
            
        </div>
    );
};

export default CreateSkillForm;
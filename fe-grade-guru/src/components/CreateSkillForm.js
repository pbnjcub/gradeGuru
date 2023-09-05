import React from 'react';
import {useState} from'react';
import { useNavigate } from 'react-router-dom';
import { createUnitSkill } from '../actions/units';
import '../styling/TeacherView.css'

const CreateSkillForm = ({teacher_id, unitObj, addUnitSkill, newUnitSkill, setNewUnitSkill, handleNewUnitSkill, toggleNewSkill}) => {
    const navigate = useNavigate();
    const unit_id = unitObj.id;

    const [errorMessages, setErrorMessages] = useState([]);
    
    const handleChange = (e) => {
        setNewUnitSkill({ ...newUnitSkill, [e.target.name]: e.target.value });
    };

    const handleSkillSubmit = async (newUnitSkill) => {
        const resp = await createUnitSkill(teacher_id, unit_id, newUnitSkill)
        if (resp.errors) {
            setErrorMessages(resp.errors)
        } else {
            setErrorMessages([]);
            addUnitSkill(resp)
            setNewUnitSkill({
                title: "",
                description: "",
                unit_id: unitObj.id,
            });
            toggleNewSkill()
            navigate(`/teachers/${teacher_id}/units/${unit_id}`);
        }
    };

    const handleCancelClick = () => {
        toggleNewSkill();
        setErrorMessages([]);
      };


    // const handleSkillSubmit = (newUnitSkill) => {
    //     handleNewUnitSkill(newUnitSkill);
    //     setNewUnitSkill({
    //         title: "",
    //         description: "",
    //         unit_id: unitObj.id,
    //     });
    //     toggleNewSkill()
    //     navigate(`/teachers/${teacher_id}/units/${unit_id}`);

    // };
    const renderErrors = errorMessages.map((message, index) => <div className="container"><h3 key={index} className="error">{message}</h3></div>);

    return (
        <div>
            <h3>New Unit Skill Form</h3>
            <br />
            {renderErrors}
            <br />
                <label>Title: </label>
                <input type="text" name="title" value={newUnitSkill.title} onChange={handleChange} />
                <label>Description: </label>
                <input type="text" name="description" value={newUnitSkill.description} onChange={handleChange} />

                <button className="pure-button pure-button-primary" onClick={() => handleSkillSubmit(newUnitSkill)}>Add Skill</button>
                <button className="pure-button pure-button-primary" onClick={handleCancelClick}>Cancel</button>
            
        </div>
    );
};

export default CreateSkillForm;
import React, {useState} from 'react';
import { updateUnit } from '../actions/units'
import { useNavigate } from 'react-router-dom';
import userContext from './UserContext';
import '../styling/TeacherView.css'


const UpdateUnitForm = ({unitObj, handleUpdatedUnit, toggleEditingUnit}) => {
    const { currentUser } = React.useContext(userContext);
    const teacher_id = currentUser.id
    const unit_id = unitObj.id
    const navigate = useNavigate();


    const [updatedUnit, setUpdatedUnit] = useState({
      title: unitObj.title,
      description: unitObj.description,
    });

    const [errorMessages, setErrorMessages] = useState([]);

    const handleChange = (e) => {
      setUpdatedUnit({ ...updatedUnit, [e.target.name]: e.target.value})
  };
  
    const handleUpdateUnit = async (updatedUnit) => {
      const resp = await updateUnit(teacher_id, unit_id, updatedUnit)
      if (resp.errors) {
        setErrorMessages(resp.errors)
      } else {
        setErrorMessages([])
        toggleEditingUnit()
        handleUpdatedUnit(resp)
        navigate(`/teachers/${teacher_id}/units/${unit_id}`);
      }
       
    }

    const handleCancelClick = () => {
      toggleEditingUnit();
      setErrorMessages([]);
    };

    const renderErrors = errorMessages.map((message, index) => <div className="container"><h3 key={index} className="error">{message}</h3></div>);

    return (
        <div>
            <h3>Update Unit</h3>
            <br />
            {renderErrors}
            <br />
                <label>Unit Title: </label>
                <input type="text" name="title" value={updatedUnit.title} onChange={handleChange} />
                <label>Description: </label>
                <input type="text" name="description" value={updatedUnit.description} onChange={handleChange} />
                <button className="pure-button pure-button-primary" onClick={() => handleUpdateUnit(updatedUnit)}>Save Changes</button>
                <button className="pure-button pure-button-primary" onClick={handleCancelClick}>Cancel</button>

        </div>
    );
}

export default UpdateUnitForm;
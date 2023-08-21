import React, {useState} from 'react';
import { createUnit} from '../actions/units';
import { useNavigate } from 'react-router-dom';
import userContext from './UserContext';


const UpdateUnitForm = () => {
    //state variables
    const { currentUser } = React.useContext(userContext);
    const teacher_id = currentUser.id
    const navigate = useNavigate();


    const [newUnit, setNewUnit] = useState({
      title: "",
      description: "",
    });

    const [errorMessages, setErrorMessages] = useState([]);

    const handleChange = (e) => {
      setNewUnit({ ...newUnit, [e.target.name]: e.target.value})
  };
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await createUnit(teacher_id);
      if (response.errors) {
        setErrorMessages(response.errors);
        console.log(errorMessages)
      } else {
        console.log("Unit created")
        setErrorMessages([]);
      }
      navigate(`/teachers/${teacher_id}`);

    };
    //renders errors
    const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);

    return (
        <div style={{marginLeft: '50px'}}>
            <h1>Create Unit</h1>
            <br />
            {renderErrors}
            <br />
            <form onSubmit={handleSubmit}>
                <label>Unit Title: </label>
                <input type="text" name="title" value={newUnit.title} onChange={handleChange} />
                <label>Description: </label>
                <input type="text" name="description" value={newUnit.description} onChange={handleChange} />
                <button className="pure-button pure-button-primary" type="submit">
                Create Unit
              </button>
            </form>

        </div>
    );
}

export default UpdateUnitForm;
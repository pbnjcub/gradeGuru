import React, {useState, useContext} from 'react';
import { UserContext } from "../contexts/UserContext"
import { createUnit} from '../actions/units';
import { useNavigate } from 'react-router-dom';
import '../styling/TeacherView.css'
import '../styling/SimpleForms.css'



const CreateUnitForm = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
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
      const resp = await createUnit(teacher_id, newUnit);
      if (resp.errors) {
        setErrorMessages(resp.errors);
      } else {
        setErrorMessages([]);
        navigate(`/teachers/${teacher_id}/units`);
      }
    };


  const renderErrors = errorMessages.map((message, index) => <div className="container"><h3 key={index} className="error">{message}</h3></div>);

  if (loading) {
    return <div>Loading...</div>;
}

    return (
        <div className="container">
            <h1>Create Unit</h1>
            <br />
            {renderErrors}
            <br />
            <form className="edit-form" onSubmit={handleSubmit}>
                <label>Unit Title: </label>
                <input type="text" name="title" value={newUnit.title} onChange={handleChange} />
                <label>Description: </label>
                <input type="text" name="description" value={newUnit.description} onChange={handleChange} />
                <div>
                <button className="pure-button pure-button-primary" type="submit">
                Create Unit
              </button>
              </div>
            </form>

        </div>
    );
}

export default CreateUnitForm;
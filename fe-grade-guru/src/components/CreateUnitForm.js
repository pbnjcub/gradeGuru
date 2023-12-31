import React, {useState, useContext} from 'react';
import { UserContext } from "../contexts/UserContext"
import { UnitsContext } from "../contexts/UnitsForTeacherContext"
import { createUnit} from '../actions/units';
import { useNavigate } from 'react-router-dom';
import '../styling/TeacherView.css'
import '../styling/SimpleForms.css'

const CreateUnitForm = () => {
  const { currentUser, loading } = useContext(UserContext);
  const { addUnit } = useContext(UnitsContext)
  const teacher_id = currentUser.id
  const navigate = useNavigate();


    const [newUnit, setNewUnit] = useState({
      title: "",
      description: "",
      teacher_id: teacher_id,
    });

    const [errorMessages, setErrorMessages] = useState([]);

    const handleChange = (e) => {
      setNewUnit({ ...newUnit, [e.target.name]: e.target.value})
  };
  
  console.log(newUnit)

    const handleSubmit = async (e) => {
      e.preventDefault();
      const resp = await createUnit(newUnit);
      if (resp.errors) {
        setErrorMessages(resp.errors);
      } else {
        setErrorMessages([]);
        addUnit(resp)
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
                <button className="pure-button" type="submit">
                Create Unit
              </button>
              </div>
            </form>

        </div>
    );
}

export default CreateUnitForm;
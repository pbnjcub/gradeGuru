import React, { useState, useEffect } from 'react';
import userContext from './UserContext';
import { getUnitsForTeacher } from '../actions/teachers';
import UnitLink from './UnitLink';

const UnitsDashboard = () => {
    const { currentUser } = React.useContext(userContext);
    const [units, setUnits] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    fetchUnits(currentUser.id);
  }, [currentUser.id]);

  const fetchUnits = (id) => {
    getUnitsForTeacher(id)
      .then((data) => {
        setUnits(data);
      })
      .catch((error) => {
        setErrorMessages(error);
      })
  };





  const unitsList = units.map((unit) => <UnitLink key={unit.id} unit={unit} />);

  const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);


  return (
<div className="main" style={{marginLeft: '50px'}}>
      <h1>Units Dashboard</h1>
      <h4>Teacher: {currentUser.last_name}, {currentUser.first_name}</h4>
      <br/>
      {renderErrors}
      <div>
        <table className="pure-table pure-table-horizontal">
          <thead>
            <tr>
              <th>Unit Title</th>
            </tr>
          </thead>
          <tbody>
            {unitsList}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnitsDashboard;

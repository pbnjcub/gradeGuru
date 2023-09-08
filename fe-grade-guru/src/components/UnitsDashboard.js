import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../contexts/UserContext"
import { UnitsContext } from "../contexts/UnitsForTeacherContext"
import { getUnitsForTeacher } from '../actions/teachers';
import UnitLink from './UnitLink';
import '../styling/TeacherView.css'


const UnitsDashboard = () => {
  const { currentUser, loading: userLoading, refreshCurrentUser} = useContext(UserContext);
  const { units, setUnits, loading: unitsLoading, setLoading } = useContext(UnitsContext);
  const [errorMessages, setErrorMessages] = useState([]);
  
  console.log(units)

    // useEffect(() => {
    //     refreshCurrentUser();
    // }, []);

    useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        setLoading(true);
        setErrorMessages([])

        const data = await getUnitsForTeacher(currentUser.id)
     
        if (data) {
          setUnits(data)
        } else {
          setErrorMessages(['Failed to fetch unit data.'])
        }
        setLoading(false)
      }
    }
    fetchData();
  }, [currentUser]);

  console.log(units)
  const unitsList = units.map((unit) => <UnitLink key={unit.id} unit={unit} teacher_id={currentUser.id} />);

  const renderErrors = errorMessages.map((message, index) => <div className="container"><h3 key={index} className="error">{message}</h3></div>);


  if (userLoading || unitsLoading) {
    return <div>Loading...</div>;
  }

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

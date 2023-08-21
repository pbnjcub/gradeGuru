import React from 'react';
import { Link } from 'react-router-dom';
import userContext from './UserContext';




const UnitLink = ({ unit }) => {
  const { currentUser } = React.useContext(userContext);


  return (
    <tr>
      <td>
        <Link to={`/teachers/${currentUser.id}/units/${unit.id}`}>
          {unit.title}
        </Link>
      </td>
    </tr>
  );
};

export default UnitLink;

import React, { useContext } from 'react';
import { UserContext } from "../contexts/UserContext"
import { Link } from 'react-router-dom';

const UnitLink = ({ unit }) => {
  const { currentUser, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

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

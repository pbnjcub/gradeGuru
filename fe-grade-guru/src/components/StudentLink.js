import React from 'react';
import { Link } from 'react-router-dom';
import userContext from './UserContext';



const StudentLink = ({ student}) => {
  const { currentUser } = React.useContext(userContext);

  return (
    <tr>
      <td>
        <Link to={`/teachers/${currentUser.id}/students/${student.id}`}>
          {student.first_name} {student.last_name}
        </Link>
      </td>
    </tr>
  );
};

export default StudentLink;

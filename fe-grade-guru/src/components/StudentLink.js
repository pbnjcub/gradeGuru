import React from 'react';
import { Link } from 'react-router-dom';
import userContext from './UserContext';

const StudentLink = ({ student }) => {
  const { currentUser } = React.useContext(userContext);

  const linkTo = currentUser.role === 'teacher' ? `/teachers/${currentUser.id}/students/${student.id}` : `/parents/${currentUser.id}/students/${student.student.id}`

  return (
    <tr>
      <td>
        <Link to={linkTo}>
          {student.student.first_name} {student.student.last_name}
        </Link>
      </td>
    </tr>
  );
};

export default StudentLink;

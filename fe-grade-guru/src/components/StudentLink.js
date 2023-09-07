import React, { useContext } from 'react';
import { UserContext } from "../contexts/UserContext"
import { Link } from 'react-router-dom';

const StudentLink = ({ student }) => {
  const { currentUser, loading } = useContext(UserContext);

  const studentFirstName = (student) => {
    if (currentUser.role === 'teacher') {
      return student.first_name
    } else {
      return student.student.first_name
    }
  }

  const studentLastName = (student) => {
    if (currentUser.role === 'teacher') {
      return student.last_name
    } else {
      return student.student.last_name
    }
  }
  const linkTo = currentUser.role === 'teacher' ? `/teachers/${currentUser.id}/students/${student.id}` : `/parents/${currentUser.id}/students/${student.student.id}`
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <tr>
      <td>
        <Link to={linkTo}>
          { studentFirstName(student) } {studentLastName(student)}
        </Link>
      </td>
    </tr>
  );
};

export default StudentLink;

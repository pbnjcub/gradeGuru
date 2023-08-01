import React from 'react';
import { Link } from 'react-router-dom';

const StudentLink = ({ student}) => {

  return (
    <tr>
      <td>
        {/* <Link to={`/students/${student.id}`}> */}
          {student.first_name} {student.last_name}
        {/* </Link> */}
      </td>
    </tr>
  );
};

export default StudentLink;

import React from 'react';
import userContext from './UserContext';

const StudentEnrollmentList = ({ student, confirmUnenrollmentClick }) => {
  const { currentUser } = React.useContext(userContext);

  return (

    <tr>
      <td>
          { student.first_name} {student.last_name}
      </td>
      <td>
        <button onClick={() => confirmUnenrollmentClick(student)}>Unenroll</button>
      </td>
    </tr>
  );
};

export default StudentEnrollmentList;

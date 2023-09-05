import React from 'react';
import '../styling/TablesForms.css'

const StudentEnrollmentList = ({ student, confirmUnenrollmentClick }) => {

  return (

    <tr>
      <td>
          { student.first_name} {student.last_name}
      </td>
      <td>
        <button className="pure-button" onClick={() => confirmUnenrollmentClick(student)}>Unenroll</button>
      </td>
    </tr>
  );
};

export default StudentEnrollmentList;

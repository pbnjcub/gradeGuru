import React, { useContext } from 'react';
import { UserContext } from "../contexts/UserContext"
import '../styling/TablesForms.css'

const StudentEnrollmentList = ({ student, confirmUnenrollmentClick }) => {
  const { loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }
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

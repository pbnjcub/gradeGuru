import React, { useContext } from 'react';
import { UserContext } from "../contexts/UserContext"
import '../styling/TablesForms.css'


const EnrollStudentSearch = ({ handleSearch, handleAddClick, handleUnselectClick, searchStudent, filteredStudents, selectedStudents, selectedTeacher }) => {
    const { loading } = useContext(UserContext);
    console.log(filteredStudents)

    const listFilteredStudents = searchStudent === '' ? [] : filteredStudents.map((student) => (
        <tr key={student.id}>
            <td>{student.first_name}</td>
            <td>{student.last_name}</td>
            <td>
                {selectedTeacher && student.student_feedbacks.some(feedback => feedback.teacher_id === selectedTeacher.id) ? 
                    'Enrolled' :
                    <button className="pure-button" onClick={() => handleAddClick(student)}>+</button>
                }
            </td>
        </tr>
    ));

  const listSelectedStudents = selectedStudents.length === 0 ? [] : selectedStudents.map((student) => (
        <tr key={student.id}>
            <td>{student.first_name}</td>
            <td>{student.last_name}</td>
            <td>
                <button className="pure-button" onClick={() => handleUnselectClick(student)}>-</button>
            </td>
        </tr>
  ))

  if (loading) {
    return <div>Loading...</div>;
}
  return (
    <div>
      <div className="input-group">
        <label>Search Student by Name:</label>
        <input type="text" name="search" value={searchStudent} onChange={handleSearch} />
      </div>
      <div className="table-container">
        <h3>Student Search Results:</h3>
        <table className="results-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listFilteredStudents}
          </tbody>
        </table>
      </div>
      <div className="table-container">
        <h3>Selected Students:</h3>
        <table className="results-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listSelectedStudents}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EnrollStudentSearch;


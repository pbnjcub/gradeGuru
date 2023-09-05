import React from 'react';
import '../styling/TablesForms.css'


const EnrollTeacherSearch = ({ handleTeacherSearch, handleAddTeacherClick, handleUnselectTeacherClick, searchTeacher, filteredTeachers, selectedTeacher }) => {

  const listFilteredTeachers = searchTeacher === '' ? [] : filteredTeachers.map((teacher) => (
    <tr key={teacher.id}>
        <td>{teacher.first_name}</td>
        <td>{teacher.last_name}</td>
        <td>
            {teacher.teacher_feedbacks && teacher.teacher_feedbacks.length === 0 ? (
                <span>No assigned sections</span>
                ) : (
                <button onClick={() => handleAddTeacherClick(teacher)}>+</button>
            )}
        </td>
    </tr>
  ));

  return (
    <div>
      <div className="input-group">
        <label>Search Teacher by Name:</label>
        <input type="text" name="search" value={searchTeacher} onChange={handleTeacherSearch} />
      </div>
      <div className="table-container">
        <h3>Teacher Search Results:</h3>
        <table className="results-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listFilteredTeachers}
          </tbody>
        </table>
      </div>
      <div className="table-container">
        <h3>Selected Teacher:</h3>
        <table className="results-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {selectedTeacher ? (
              <tr key={selectedTeacher.id}>
                <td>{selectedTeacher.first_name}</td>
                <td>{selectedTeacher.last_name}</td>
                <td>
                  <button onClick={() => handleUnselectTeacherClick(selectedTeacher)}>-</button>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EnrollTeacherSearch;


// EnrollTeacherSearch.js
import React from 'react';

const UnenrollTeacherSearch = ({ allTeachers, handleTeacherSearch, handleSelectTeacherClick, handleUnselectTeacherClick, searchTeacher, filteredTeachers, selectedTeacher }) => {

  const listFilteredTeachers = searchTeacher === '' ? [] : filteredTeachers.map((teacher) => (
    <tr key={teacher.id}>
        <td>{teacher.first_name}</td>
        <td>{teacher.last_name}</td>
        <td>
            <button onClick={() => handleSelectTeacherClick(teacher)}>Show Enrolled</button>
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
        <table  className="results-table">
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
    </div>
  );
}

export default UnenrollTeacherSearch;

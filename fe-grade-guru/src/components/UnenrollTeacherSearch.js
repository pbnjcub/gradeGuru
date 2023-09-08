import React, { useContext } from 'react';
import { UserContext } from "../contexts/UserContext"

const UnenrollTeacherSearch = ({ handleTeacherSearch, handleSelectTeacherClick, handleUnselectTeacherClick, searchTeacher, filteredTeachers, selectedTeacher }) => {
  const { loading } = useContext(UserContext);

  const listFilteredTeachers = searchTeacher === '' ? [] : filteredTeachers.map((teacher) => (
    <tr key={teacher.id}>
        <td>{teacher.first_name}</td>
        <td>{teacher.last_name}</td>
        <td>
            <button className="pure-button" onClick={() => handleSelectTeacherClick(teacher)}>Show Enrolled</button>
        </td>
    </tr>
  ));

  if (loading) {
    return <div>Loading...</div>;
  }

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


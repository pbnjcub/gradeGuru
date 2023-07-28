import React from 'react';

const ChildForm = ({ childInfo, handleChange }) => {
  return (
    <div>
      <h2>Add Child Information</h2>
      <label>Child First Name</label>
      <input type="text" name="first_name" value={childInfo.first_name} onChange={handleChange} />
      <label>Child Last Name</label>
      <input type="text" name="last_name" value={childInfo.last_name} onChange={handleChange} />
    </div>
  );
};

export default ChildForm;

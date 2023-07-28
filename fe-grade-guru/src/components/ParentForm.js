import React, { useState } from 'react';

const ParentForm = ({ onClose, onSubmitParent }) => {
  const [parentUser, setParentUser] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "parent",
  });

  const handleChange = (e) => {
    setParentUser({
      ...parentUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitParent(parentUser);
  };

  return (
    <div>
      <h2>Add Parent User</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" name="email" value={parentUser.email} onChange={handleChange} />
        <label>Password</label>
        <input type="password" name="password" value={parentUser.password} onChange={handleChange} />
        <label>First Name</label>
        <input type="text" name="first_name" value={parentUser.first_name} onChange={handleChange} />
        <label>Last Name</label>
        <input type="text" name="last_name" value={parentUser.last_name} onChange={handleChange} />
        <button type="submit">Add Parent</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default ParentForm;

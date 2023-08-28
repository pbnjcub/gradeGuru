import React from 'react';
import { useEffect, useState } from 'react';
import userContext from './UserContext';
import { getUsers } from '../actions/users';

const AdminDashboard = ({ users, setUsers}) => {
  const { currentUser } = React.useContext(userContext);
  const [errorMessages, setErrorMessages] = useState([]);
  
  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        setErrorMessages(error);
      });
  }, []);

  
  return (
    <div style={{marginLeft: '50px'}}>
      <h1>Admin Dashboard</h1>
      <h3>Welcome, {currentUser.first_name}</h3>
      <br />
      <p>
        As an administrator, you can create Student, Teacher and Parent accounts. You can also edit and delete users. Use the links above.
      </p>
    </div>
  );
};

export default AdminDashboard;

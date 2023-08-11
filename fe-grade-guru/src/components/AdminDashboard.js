import React from 'react';
import { useEffect, useState } from 'react';
import Signup from './Signup';
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
      <Signup />
    </div>
  );
};

export default AdminDashboard;

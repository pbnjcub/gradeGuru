import React from 'react';
import { useEffect } from 'react';
import userContext from './UserContext';

const AdminDashboard = ({ getAllUsers}) => {
  const { currentUser } = React.useContext(userContext);
 
  useEffect(() => {
    if (currentUser && currentUser.role === 'admin') {
      getAllUsers();
    }
  }, [currentUser]);
  
  return (
    <div style={{marginLeft: '50px'}}>
      <h1>Admin Dashboard</h1>
      <h3>Welcome, {currentUser.first_name}</h3>
      <br />
      <p>
        As an administrator, you can create Student, Teacher and Parent accounts. You can also edit and delete users. Finally, you can enroll and unenroll students with specific teachers. Use the links above.
      </p>
    </div>
  );
};

export default AdminDashboard;

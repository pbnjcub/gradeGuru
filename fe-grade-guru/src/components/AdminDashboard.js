import React from 'react';
import Signup from './Signup';
import userContext from './UserContext';

const AdminDashboard = () => {
  const { currentUser } = React.useContext(userContext);
  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>
      <Signup />
    </div>
  );
};

export default AdminDashboard;

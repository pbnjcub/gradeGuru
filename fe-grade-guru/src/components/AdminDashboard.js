import React, { useContext } from 'react';
import { UserContext } from "../contexts/UserContext"
import { AdminContext } from "../contexts/AdminContext";
// import { useEffect } from 'react';

const AdminDashboard = () => {
  const { currentUser, loading: userLoading } = useContext(UserContext);
  const { allUsers, loading: adminLoading } = useContext(AdminContext); 
  
  console.log(allUsers)
 
  if (userLoading || adminLoading) {
    return <div>Loading...</div>;
  }

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

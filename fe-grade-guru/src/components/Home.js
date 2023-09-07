import React, { useContext } from 'react';
import { UserContext } from "../contexts/UserContext"

const Home = () => {
  const { currentUser, loading } = useContext(UserContext);


  return (
    <div className="main" style={{ marginLeft: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img src="/GradeGuruLogo2.png" alt="GradeGuru Logo" />
        <h1>Welcome to GradeGuru</h1>
        <br />
        <h2>What is GradeGuru?</h2>
        <p>GradeGuru is a web application that allows teachers to dynamically assess their students and communicate to families about their child's progress.</p>
    </div>
  );
}

export default Home;
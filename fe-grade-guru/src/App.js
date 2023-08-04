import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContext from './components/UserContext';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import NavBar from './components/NavBar';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDetail from './components/StudentDetail';
import StudentDashboard from './components/StudentDashboard';
import { getCurrentUser } from './actions/auth';

function App() {
  //state variables
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  //function to handle current user data
  const handleCurrentUser = (user) => {
    if (user && user.email) {
      setCurrentUser(user);
      setLoggedIn(true);
    } else {
      setCurrentUser(null);
      setLoggedIn(false);
    }
  };

  //function to log out the current user
  const logoutCurrentUser = () => {
    setCurrentUser(null);
    setLoggedIn(false);
  };

  //useEffect to get current user
  useEffect(() => {
    getCurrentUser(handleCurrentUser);
  }, []);

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <div>
            <NavBar loggedIn={loggedIn} logoutCurrentUser={logoutCurrentUser} />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/signup" element={<Signup setLoggedIn={setLoggedIn} handleCurrentUser={handleCurrentUser} />} />
              <Route exact path="/login" element={<Login setLoggedIn={setLoggedIn} handleCurrentUser={handleCurrentUser} />} />
              <Route exact path="/logout" element={<Logout logoutCurrentUser={logoutCurrentUser} />} />
              <Route exact path="/admin" element={<AdminDashboard />} />
              <Route path="/teachers/:id" element={<TeacherDashboard />} />
              <Route path="/teachers/:teacher_id/students/:student_id" element={<StudentDetail />} />
              <Route exact path="/student-dashboard" element={<StudentDashboard />} />
            </Routes>
          </div>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;

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
import FeedbackForm from './components/FeedbackForm';
import UserEditForm from './components/UserEditForm';
import { getCurrentUser } from './actions/auth';
import { getGradesAndFeedbacksForStudent } from './actions/students';
function App() {
  //state variables
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [studentObj, setStudentObj] = useState(null);
  const [users, setUsers] = useState([]);
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
  console.log(studentObj)
  const getStudentData = async (userId, studentId) => {
    try {
      const data = await getGradesAndFeedbacksForStudent(userId, studentId);
      if (!data.errors) {
        return data;
      } else {
        throw new Error(data.errors.join(', '));
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleEditUser = (updatedUser) => {
    const updatedUsers = users.map((user) => {
      if (user.id === updatedUser.id) {
        return updatedUser;
      } else {
        return user;
      }
    });
    setUsers(updatedUsers);
  };

    

  const handleEditFeedback = (unitId, updatedFeedbacks) => {
    // setUpdatedUnitId(unitId);
    // setupdatedFeedbacks(updatedFeedbacks);
  };


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
              <Route exact path="/admin" element={<AdminDashboard users={users} setUsers={setUsers}/>} />
              <Route exact path="/edit-user" element={<UserEditForm users={users} setUsers={setUsers} handleEditUser={handleEditUser}/>} />
              <Route path="/teachers/:id" element={<TeacherDashboard  />} />
              <Route path="/teachers/:teacher_id/students/:student_id" element={<StudentDetail studentObj={studentObj} setStudentObj={setStudentObj} getStudentData={getStudentData}  />} />
              <Route path="/teachers/:teacher_id/students/:student_id/feedbacks/:feedbacks_id" element={<FeedbackForm handleEditFeedback={handleEditFeedback}/>} />
              <Route exact path="/student-dashboard" element={<StudentDashboard />} />
            </Routes>
          </div>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;

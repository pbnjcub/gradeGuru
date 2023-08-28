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
import UnitsDashboard from './components/UnitsDashboard';
import CreateUnitForm from './components/CreateUnitForm';
import UpdateUnitForm from './components/UpdateUnitForm';
import UnitDetails from './components/UnitDetails';
import ParentDashboard from './components/ParentDashboard';
import ParentViewStudentData from './components/ParentViewStudentData';
import { getDataForUnit } from './actions/units';
import { getCurrentUser } from './actions/auth';
import { getDataForStudent} from './actions/students'
import { getGradesAndFeedbacksForStudent } from './actions/students';
function App() {
  //state variables
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [studentObj, setStudentObj] = useState(null);
  const [unitObj, setUnitObj] = useState(null);
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

  const logoutCurrentUser = () => {
    setCurrentUser(null);
    setLoggedIn(false);
  };

  const getStudentData = (userId, studentId) => {
    return getGradesAndFeedbacksForStudent(userId, studentId)
      .then(data => {
        if (data.errors) {
          console.error(data.errors.join(', '));
          return null;
        } else {
          return data;
        }
      })
      .catch(error => {
        console.error(error);
        return null;
      });
  };

  const getStudentDataForStudent = (userId) => {
    return getDataForStudent(userId)
      .then(data => {
        if (data.errors) {
          return null;
        } else {
          return data;
        }
      })
      .catch(errors => {
        return null;
      });
  };
  
  
  // const getStudentData = (userId, studentId) => {
  //   return getGradesAndFeedbacksForStudent(userId, studentId)
  //     .then(data => {
  //       if (!data.errors) {
  //         return data;
  //       } else {
  //         throw new Error(data.errors.join(', '));
  //       }
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       return null;
  //     });
  // };

  const getUnitData = async (userId, unitId) => {
    try {
      const data = await getDataForUnit(userId, unitId);
      
      if (!data.errors) {
        return data;
      } else {
        console.error(data.errors.join(', '));
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  

  // const getUnitData = (userId, unitId) => {
  //   return getDataForUnit(userId, unitId)
  //     .then(data => {
  //       if (!data.errors) {
  //         return data;
  //       } else {
  //         throw new Error(data.errors.join(', '));
  //       }
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       return null;
  //     });
  // };
  
  const handleNewUser = (updatedUsers) => {
    setUsers(updatedUsers)
  }


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
    const updatedStudentObj = { ...studentObj };

    const unitToUpdate = updatedStudentObj.units_with_skill_and_feedback.find(unit => unit.unit.id === unitId);
    
    if (unitToUpdate) {
      unitToUpdate.feedbacks = updatedFeedbacks;
    }
    setStudentObj(updatedStudentObj);
  };

  const handleEditSkillsGrade = (updatedSkills) => {
    const updatedStudentObj = { ...studentObj };
    const unitId = updatedSkills[0].skill.unit_id;
    const unitToUpdate = updatedStudentObj.units_with_skill_and_feedback.find(unit => unit.unit.id === unitId);

    if (unitToUpdate) {
      unitToUpdate.skills = updatedSkills;
    }
    setStudentObj(updatedStudentObj);
  }



  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <div>
            <NavBar loggedIn={loggedIn} logoutCurrentUser={logoutCurrentUser} />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/signup" element={<Signup setLoggedIn={setLoggedIn} handleCurrentUser={handleCurrentUser} handleNewUser={handleNewUser} />} />
              <Route exact path="/login" element={<Login setLoggedIn={setLoggedIn} handleCurrentUser={handleCurrentUser} />} />
              <Route exact path="/logout" element={<Logout logoutCurrentUser={logoutCurrentUser} />} />
              <Route exact path="/admin" element={<AdminDashboard users={users} setUsers={setUsers}/>} />
              <Route exact path="/edit-user" element={<UserEditForm users={users} setUsers={setUsers} handleEditUser={handleEditUser}/>} />
              <Route path="/teachers/:id" element={<TeacherDashboard  />} />
              <Route path="teachers/:teacher_id/units/:unit_id" element={<UnitDetails unitObj={unitObj} setUnitObj={setUnitObj} getUnitData={getUnitData} />} />
              <Route path="/teachers/:teacher_id/units/create" element={<CreateUnitForm />} />
              <Route path="/teachers/:teacher_id/units/update" element={<UpdateUnitForm />} />
              <Route path="/teachers/:teacher_id/students/:student_id" element={<StudentDetail studentObj={studentObj} setStudentObj={setStudentObj} getStudentData={getStudentData} handleEditSkillsGrade={handleEditSkillsGrade} />} />
              <Route path="/teachers/:teacher_id/students/:student_id/feedbacks/:feedbacks_id" element={<FeedbackForm handleEditFeedback={handleEditFeedback}/>} />
              <Route path="/teachers/:teacher_id/units" element={<UnitsDashboard/>} />
              <Route path="/students/:id" element={<StudentDashboard   />} />
              <Route path="/parents/:id" element={<ParentDashboard />} />
              <Route path="/parents/:parent_id/students/:id" element={<ParentViewStudentData studentObj={studentObj} setStudentObj={setStudentObj} getStudentDataForStudent={getStudentDataForStudent}/>} />

            </Routes>
          </div>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;

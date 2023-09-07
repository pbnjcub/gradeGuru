import React, { useState, useContext } from 'react';
import { UserContext} from "./contexts/UserContext"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import Enrollments from './components/Enrollments';
import Unenrollments from './components/Unenrollments'
import { getDataForUnit } from './actions/units';
import { getUsers } from './actions/users';
import { getDataForStudent} from './actions/students'
import { getGradesAndFeedbacksForStudent } from './actions/students';

function App() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [studentObj, setStudentObj] = useState(null);
  const [unitObj, setUnitObj] = useState(null);
  const [users, setUsers] = useState([]);
  const [units, setUnits] = useState([])

  const handleCurrentUser = (user) => {
    console.log(user)
    if (user && user.email) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  };

  const logoutCurrentUser = () => {
    setCurrentUser(null);
  };

  const getAllUsers = async () => {
    const resp = await getUsers()
    if (resp.errors) {
      return null
    } else {
      setUsers(resp)
    }
  }

  const getStudentData = async (userId, studentId) => {
    const resp = await getGradesAndFeedbacksForStudent(userId, studentId)
    if (resp.errors) {
      return null
    } else {
      return resp
    }
  }
  
  const getStudentDataForStudent = async (userId) => {
    const resp = await getDataForStudent(userId);
    if (resp.errors) {
      return null;
    } else {
      return resp;
    }
  };

  const getUnitData = async (userId, unitId) => {
    const resp = await getDataForUnit(userId, unitId)
    if (resp.errors) {
      return null
    } else {
      return resp
    }

  }

  const handleNewUser = (updatedUsers) => {
    setUsers(updatedUsers)
  }

  const handleUpdatedEnrollments = (updatedUsers) => {
    const updatedUsersObj = users.map(user => {
      const updatedUser = updatedUsers.find(updatedUser => updatedUser.id === user.id);
      if (updatedUser) {
        return updatedUser;
      } else {
        return user;
      }
    })
    setUsers(updatedUsersObj)
  }

  const handleUpdatedUnenrollments = (updatedStudent) => {
    const updatedUsersObj = users.map(user => {
      if (user.id === updatedStudent.id) {
        return updatedStudent;
      } else {
        return user;
      }
    })
    setUsers(updatedUsersObj)
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

          <div>
            <NavBar logoutCurrentUser={logoutCurrentUser} />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/signup" element={<Signup  handleCurrentUser={handleCurrentUser} handleNewUser={handleNewUser} />} />
              <Route exact path="/login" element={<Login handleCurrentUser={handleCurrentUser} />} />
              <Route exact path="/logout" element={<Logout logoutCurrentUser={logoutCurrentUser} />} />
              <Route exact path="/admin" element={<AdminDashboard users={users} setUsers={setUsers} getAllUsers={getAllUsers} />} />
              <Route exact path="/edit-user" element={<UserEditForm users={users} setUsers={setUsers} handleEditUser={handleEditUser}/>} />
              <Route exact path="/enroll-students" element={<Enrollments users={users} handleUpdatedEnrollments={handleUpdatedEnrollments}/>}/>
              <Route exact path="/unenroll-students" element={<Unenrollments users={users} handleUpdatedUnenrollments={handleUpdatedUnenrollments}/>}/>
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

      </Router>
    </div>

  );
}

export default App;

import React, { useContext } from 'react';
import { UserContext } from "../contexts/UserContext"
import { NavLink } from 'react-router-dom';
import '../styling/NavBar.css'

const NavBar = () => {
  const { currentUser, loading, loggedIn } = useContext(UserContext);

  const renderManageUnitsSubMenu = () => {
    if (currentUser.role === 'teacher') {
      return (
        <ul className="sub-menu">
          <li className="sub-menu-item">
            <NavLink className="pure-menu-link" to={`/teachers/${currentUser.id}/units/create`}>
              Create Unit
            </NavLink>
          </li>
        </ul>
      );
    }
    return null;
  };

  const renderEnrollmentSubMenu = () => {
    if (currentUser.role === 'admin') {
      return (
        <ul className="sub-menu">
          <li className="sub-menu-item">
            <NavLink className="pure-menu-link" to={'/enroll-students'}>
              Enroll Students
            </NavLink>
          </li>
          <li className="sub-menu-item">
            <NavLink className="pure-menu-link" to={'/unenroll-students'}>
              Unenroll Students
            </NavLink>
          </li>
        </ul>
      );
    }
    return null;
  };

  if (loading) {
    return <div className="loading-navbar">Loading...</div>; // or any appropriate loading UI for your navbar
  }
  console.log(loggedIn)
    if (loggedIn) {
        const role = currentUser.role;
    return (
      <div className="pure-menu pure-menu-horizontal">
        <a href="/" className="pure-menu-heading pure-menu-link">
          <img src="/GradeGuruLogo2.png" alt="GradeGuru Logo" width="75" height="auto" />
        </a>
        <ul className="pure-menu-list">
          <li className="pure-menu-item">
            <NavLink className="pure-menu-link" to="/">
              Home
            </NavLink>
          </li>
          {role === 'parent' && (
            <li className="pure-menu-item">
              <NavLink className="pure-menu-link" to={`/parents/${currentUser.id}`}>
                Parent Dashboard
              </NavLink>
            </li>
          )}
          {role === 'student' && (
            <li className="pure-menu-item">
              <NavLink className="pure-menu-link" to={`/students/${currentUser.id}`}>
                Student Dashboard
              </NavLink>
            </li>
          )}
          {role === 'teacher' && (
            <React.Fragment>
            <li className="pure-menu-item">
              <NavLink className="pure-menu-link has-sub-menu" to={`/teachers/${currentUser.id}`}>
                Teacher Dashboard
              </NavLink>
            </li>
            <li className="pure-menu-item">
              <div className="pure-menu-link has-sub-menu">
              <span>
                <NavLink className="pure-menu-link" to={`/teachers/${currentUser.id}/units`}>
                  Manage Units
                </NavLink>
                {renderManageUnitsSubMenu()}
              </span>
              </div>
            </li>
            </React.Fragment>
          )}
          {role === 'admin' && (
            <React.Fragment>
              <li className="pure-menu-item">
                <NavLink className="pure-menu-link" to="/signup">
                  Create Account
                </NavLink>
              </li>
              <li className="pure-menu-item">
                <NavLink className="pure-menu-link" to="/edit-user">
                  Edit User
                </NavLink>
              </li>
              <li className="pure-menu-item">
                <div className="pure-menu-link has-sub-menu">
                  <span>
                    <NavLink className="pure-menu-link" to="#">
                    Enrollments
                  </NavLink>
                  {renderEnrollmentSubMenu()}
                  </span>
                </div>
              </li>
            </React.Fragment>
          )}
          <li className="pure-menu-item">
            <NavLink className="pure-menu-link" to="/logout">
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="pure-menu pure-menu-horizontal">
         <a href="/" className="pure-menu-heading pure-menu-link">
          <img src="/GradeGuruLogo2.png" alt="GradeGuru Logo" width="75" height="auto" />
        </a>
        <ul className="pure-menu-list">
          <li className="pure-menu-item">
            <NavLink className="pure-menu-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="pure-menu-item">
            <NavLink className="pure-menu-link" to="/login">
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
};

export default NavBar;

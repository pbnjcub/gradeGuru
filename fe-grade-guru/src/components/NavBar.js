import React from 'react';
import { NavLink } from 'react-router-dom';
import userContext from './UserContext';

const NavBar = ({ loggedIn }) => {
  const { currentUser } = React.useContext(userContext);

  const renderManageUnitsSubMenu = () => {
    if (currentUser.role === 'teacher') {
      return (
        <ul className="sub-menu">
          <li className="sub-menu-item">
            <NavLink className="pure-menu-link" to="/teachers/:teacher_id/units/create">
              Create Unit
            </NavLink>
          </li>
        </ul>
      );
    }
    return null;
  };

    if (loggedIn) {
        const role = currentUser.role;
    return (
      <div className="pure-menu pure-menu-horizontal">
        <a href="/" className="pure-menu-heading pure-menu-link">
          <img src="./GradeGuruLogo.png" alt="GradeGuru Logo" width="100" height="auto" />
        </a>
        <ul className="pure-menu-list">
          <li className="pure-menu-item">
            <NavLink className="pure-menu-link" to="/">
              Home
            </NavLink>
          </li>
          {role === 'parent' && (
            <li className="pure-menu-item">
              <NavLink className="pure-menu-link has-sub-menu" to="/parents/:id">
                Parent Dashboard
              </NavLink>
            </li>
          )}
          {role === 'teacher' && (
            <React.Fragment>
            <li className="pure-menu-item">
              <NavLink className="pure-menu-link has-sub-menu" to="/teachers/:id">
                Teacher Dashboard
              </NavLink>
            </li>
            <li className="pure-menu-item">
              <div className="pure-menu-link has-sub-menu">
              <span>
                <NavLink className="pure-menu-link" to="/teachers/:teacher_id/units">
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
          <img src="./GradeGuruLogo.png" alt="GradeGuru Logo" width="100" height="auto" />
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

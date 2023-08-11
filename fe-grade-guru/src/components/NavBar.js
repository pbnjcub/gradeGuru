import React from 'react';
import { NavLink } from 'react-router-dom';
import userContext from './UserContext';

const NavBar = ({ loggedIn }) => {
  const { currentUser } = React.useContext(userContext);

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
          {role === 'teacher' && (
            <li className="pure-menu-item">
              <NavLink className="pure-menu-link" to="/teachers/:id">
                Teacher Dashboard
              </NavLink>
            </li>
          )}
          {role === 'admin' && (
            <React.Fragment>
              <li className="pure-menu-item">
                <NavLink className="pure-menu-link" to="/create-account">
                  Create Account
                </NavLink>
              </li>
              <li className="pure-menu-item">
                <NavLink className="pure-menu-link" to="/edit-user">
                  Edit User
                </NavLink>
              </li>
              <li className="pure-menu-item">
                <NavLink className="pure-menu-link" to="/delete-user">
                  Delete User
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

import React from 'react';
import { NavLink} from 'react-router-dom';


const NavBar = ({loggedIn}) => {
    if(loggedIn) {
        return (
            <div className="pure-menu pure-menu-horizontal">
                <a href="/" className="pure-menu-heading pure-menu-link">
                    <img src="./GradeGuruLogo.png" alt="GradeGuru Logo" width="100" height="auto"/>
                </a>
                <ul className="pure-menu-list">
                    <li className="pure-menu-item">
                        <NavLink className="pure-menu-link" to="/">Home</NavLink>
                    </li>
                    <li className="pure-menu-item">
                        <NavLink className="pure-menu-link" to="/logout">Logout</NavLink>
                    </li>

                </ul>

            </div>
        );
    } else {
        return (
            <div className="pure-menu pure-menu-horizontal">
                <a href="/" className="pure-menu-heading pure-menu-link">
                    <img src="./GradeGuruLogo.png" alt="GradeGuru Logo" width="100" height="auto"/>
                </a>
                <ul className="pure-menu-list">
                    <li className="pure-menu-item">
                        <NavLink className="pure-menu-link" to="/">Home</NavLink>
                    </li>
                    <li className="pure-menu-item">
                        <NavLink className="pure-menu-link" to="/login">Login</NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NavBar;
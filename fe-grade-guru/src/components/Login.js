import React, {useState, useContext} from 'react';
import { UserContext } from "../contexts/UserContext"
import { login } from '../actions/auth';
import { useNavigate } from 'react-router-dom';
import '../styling/SimpleForms.css'

const Login = ({handleCurrentUser}) => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState([]);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const handleNavigation = (role, userId) => {
        if (role === 'admin') {
            navigate("/admin");
        } else if (role === 'teacher') {
            navigate(`/teachers/${userId}`);
        } else if (role === 'parent') {
            navigate(`/parents/${userId}`)
        } else if (role === 'student') {
            navigate(`/students/${userId}`);
        } else {
            navigate("/");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resp = await login(user, handleCurrentUser, handleNavigation);
        if (resp && !resp.errors) {
            setErrorMessages([]);
            handleNavigation(resp.role, resp.id);
        } else {
            setErrorMessages(resp.errors);
        }
    };
    
    return (
        <div className="main" style={{marginLeft: '50px'}}>
            <h1>Login</h1>

            {errorMessages}
            <br />
            <br />
            <form className="edit-form" onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="text" name="email" value={user.email} autoComplete="email" onChange={handleChange} />
                <label>Password</label>
                <input type="password" name="password" value={user.password} autoComplete="current-password" onChange={handleChange} />
                <div>
                    <input type="submit" className="pure-button-primary" value="Submit" />
                </div>
            </form>
        </div>
    );
}

export default Login;
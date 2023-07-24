import React, {useState} from 'react';
import { login } from '../actions/auth';
import { useNavigate } from 'react-router-dom';

const Login = ({handleCurrentUser, handleTeacherCourses}) => {
    //state variables
    const [userTeacher, setUserTeacher] = useState({
        username: "",
        password: "",
    })
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState([]);

    //sets userTeacher state from form data
    const handleChange = (e) => {
        setUserTeacher({
            ...userTeacher,
            [e.target.name]: e.target.value,
        })
    }
        
    //submit action => uses login action from auth.js and hadles return
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = login(userTeacher, handleCurrentUser, handleTeacherCourses);
        if (response.errors) {
            setErrorMessages(response.errors);
        } else {
          navigate("/teachers/:teacher_id/courses");
          setErrorMessages([]);
      }
    };

    //renders the errors if authorization fails
    const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);

    
    return (
        <div className="main">
            <h1>Login</h1>
            <br />
            {renderErrors}
            <br />
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" name="username" value={userTeacher.username} autoComplete="username" onChange={handleChange} />
                <label>Password</label>
                <input type="password" name="password" value={userTeacher.password} autoComplete="current-password" onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Login;
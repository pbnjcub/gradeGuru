import React, {useState} from 'react';
import { login } from '../actions/auth';
import { useNavigate } from 'react-router-dom';

const Login = ({handleCurrentUser}) => {
    //state variables
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
        const response = await login(user, handleCurrentUser, handleNavigation);

        if (response && !response.errors) {
            setErrorMessages([]);
        } else {
            setErrorMessages(response?.errors || ["Error during login. Please try again."]);
        }
    };
      
    const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);

    
    return (
        <div className="main" style={{marginLeft: '50px'}}>
            <h1>Login</h1>
            <br />
            {renderErrors}
            <br />
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="text" name="email" value={user.email} autoComplete="email" onChange={handleChange} />
                <label>Password</label>
                <input type="password" name="password" value={user.password} autoComplete="current-password" onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Login;
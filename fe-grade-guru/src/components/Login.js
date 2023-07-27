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

    //sets userTeacher state from form data
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }
        
    //submit action => uses login action from auth.js and hadles return
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = login(user, handleCurrentUser);
        if (response.errors) {
            setErrorMessages(response.errors);
        } else {
          console.log("Login successful");
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
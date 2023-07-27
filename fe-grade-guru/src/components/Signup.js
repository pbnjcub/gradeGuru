import React, {useState} from 'react';
import { createAccount } from '../actions/auth';
import { useNavigate } from 'react-router-dom';

const Signup = ({handleCurrentUser, handleTeacherCourses}) => {
    //state variables
    const [newUser, setNewUser] = useState({
        email: "",
        password: "",
        last_name: "",
        first_name: "",
        role: "teacher",

      });
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState([]);

      //updates state of
      const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        })  
      };

      console.log(newUser)
      // submit action => createAccount from auth.js
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = createAccount(newUser, handleCurrentUser);
        if (response.errors) {
            setErrorMessages(response.errors);
        } else {
          console.log("Account created")
          setErrorMessages([]);
      }
    };
    //renders errors
    const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);

    return (
        <div>
            <h1>Create Account</h1>
            <br />
            {renderErrors}
            <br />
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="text" name="email" value={newUser.email} onChange={handleChange} />
                <label>Password</label>
                <input type="password" name="password" value={newUser.password} onChange={handleChange} />
                <label>First Name</label>
                <input type="text" name="first_name" value={newUser.first_name} onChange={handleChange} />
                <label>Last Name</label>
                <input type="text" name="last_name" value={newUser.last_name} onChange={handleChange} />
                <label>Role</label>
                <select name="role" value={newUser.role} onChange={handleChange}>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                </select>
                <input type="submit" value="Signup" />
            </form>

        </div>
    );
}

export default Signup;
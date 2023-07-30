import React, {useState} from 'react';
import { createAccount } from '../actions/auth';


const Signup = ({handleCurrentUser}) => {
    //state variables
    const initialUserState = {
      email: "",
      password: "",
      last_name: "",
      first_name: "",
      role: "admin",
      parent: {
        email: "",
        password: "",
        last_name: "",
        first_name: "",
        role: "parent"
      }
    };

    const [newUser, setNewUser] = useState(initialUserState);

    const [errorMessages, setErrorMessages] = useState([]);


    const handleChange = (e) => {
      if (e.target.name.includes("parent")) {
      setNewUser((prevUser) => ({
        ...prevUser,
        parent: {
          ...prevUser.parent,
          [e.target.name.split(".")[1]]: e.target.value,
        },
      }));
    } else {
      setNewUser((prevUser) => ({
        ...prevUser,
        [e.target.name]: e.target.value,
      }));
    }
  };
  
  console.log(newUser)


    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await createAccount(newUser, handleCurrentUser);
      if (response.errors) {
        setErrorMessages(response.errors);
        console.log(errorMessages)
      } else {
        console.log("Account created")
        setErrorMessages([]);
        setNewUser(initialUserState);
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
                  <option value="admin">Admin</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </select>
                {newUser.role === "student" ? (
                  <div>
                    <hr />
                    <h2>Add Parent Information</h2>
                    <label>Parent Email</label>
                    <input type="text" name="parent.email" value={newUser.parent.email} onChange={handleChange} />
                    <label>Parent Password</label>
                    <input type="password" name="parent.password" value={newUser.parent.password} onChange={handleChange} />
                    <label>Parent First Name</label>
                    <input type="text" name="parent.first_name" value={newUser.parent.first_name} onChange={handleChange} />
                    <label>Parent Last Name</label>
                    <input type="text" name="parent.last_name" value={newUser.parent.last_name} onChange={handleChange} />
                  </div>
                ) : null

              }
                <input type="submit" value="Signup" />
            </form>

        </div>
    );
}

export default Signup;
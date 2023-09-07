import React, {useState, useContext} from 'react';
import { UserContext } from "../contexts/UserContext"
import { createAccount } from '../actions/users';
import '../styling/TablesForms.css'

const Signup = ({handleCurrentUser, handleNewUser}) => {
  const { currentUser, loading } = useContext(UserContext);

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

    const [accountCreated, setAccountCreated] = useState(false)
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

    const showSuccessMessage = () => {
      setAccountCreated(true)

      setTimeout(() => {
        setAccountCreated(false)
      }, 5000)
    }
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(newUser)
      const resp = await createAccount(newUser, handleCurrentUser);
      if (resp.errors) {
        setErrorMessages(resp.errors);
      } else {
        setErrorMessages([]);
        setNewUser(initialUserState);
        handleNewUser(resp)
        showSuccessMessage()
      }
    };

    if (loading) {
      return <div>Loading...</div>;
    }

    const renderErrors = errorMessages.map((message, index) => <div className="container"><h3 key={index} className="error">{message}</h3></div>);
    
    return (
      <div className="container">
          <h1>Create Account</h1>
          <br />
          {renderErrors}
          {accountCreated ? (
              <h3>Account Created!</h3>
          ) : null
          }
          <br />
          <form onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td><label>Email:</label></td>
                  <td><input type="text" name="email" value={newUser.email} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td><label>Password:</label></td>
                  <td><input type="password" name="password" value={newUser.password} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td><label>First Name:</label></td>
                  <td><input type="text" name="first_name" value={newUser.first_name} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td><label>Last Name:</label></td>
                  <td><input type="text" name="last_name" value={newUser.last_name} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td><label>Role:</label></td>
                  <td>
                    <select name="role" value={newUser.role} onChange={handleChange}>
                      <option value="admin">Admin</option>
                      <option value="teacher">Teacher</option>
                      <option value="student">Student</option>
                    </select>
                  </td>
                </tr>
                {newUser.role === "student" && (
                  <>
                    <tr>
                      <td colSpan="2"><hr /></td>
                    </tr>
                    <tr>
                      <td colSpan="2"><h2>Add Parent Information</h2></td>
                    </tr>
                    <tr>
                      <td><label>Parent Email</label></td>
                      <td><input type="text" name="parent.email" value={newUser.parent.email} onChange={handleChange} /></td>
                    </tr>
                    <tr>
                      <td><label>Parent Password</label></td>
                      <td><input type="password" name="parent.password" value={newUser.parent.password} onChange={handleChange} /></td>
                    </tr>
                    <tr>
                      <td><label>Parent First Name</label></td>
                      <td><input type="text" name="parent.first_name" value={newUser.parent.first_name} onChange={handleChange} /></td>
                    </tr>
                    <tr>
                      <td><label>Parent Last Name</label></td>
                      <td><input type="text" name="parent.last_name" value={newUser.parent.last_name} onChange={handleChange} /></td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
            <input type="submit" className="pure-button" value="Signup" />
          </form>
      </div>
  );
  
}

export default Signup;
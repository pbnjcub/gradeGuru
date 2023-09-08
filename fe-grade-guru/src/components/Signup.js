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
    role: "admin"
  };

  const [newUser, setNewUser] = useState(initialUserState);
  const [errorMessages, setErrorMessages] = useState([]);
  const [accountCreated, setAccountCreated] = useState(false);

  const handleChange = (e) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await createAccount(newUser, handleCurrentUser);
    if (resp.errors) {
      setErrorMessages(resp.errors);
    } else {
      handleNewUser(resp)
      setErrorMessages([]);
      setNewUser(initialUserState);
      showSuccessMessage();
    }
  };

  const showSuccessMessage = () => {
    setAccountCreated(true)
    setTimeout(() => {
      setAccountCreated(false)
    }, 5000)
  }

  if (loading) return <div>Loading...</div>;

    const renderErrors = errorMessages.map((message, index) => <div className="container"><h3 key={index} className="error">{message}</h3></div>);
    
    return (
      <div className="container">
      <h1>Create Account</h1>
      <br />
      {errorMessages.map((message, index) => (
        <div className="container" key={index}>
          <h3 className="error">{message}</h3>
        </div>
      ))}
      {accountCreated && <h3>Account Created!</h3>}
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
                  <option value="parent">Parent</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" className="pure-button" value="Signup" />
      </form>
    </div>
  );
}

export default Signup;






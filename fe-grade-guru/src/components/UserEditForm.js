import React, {useState} from 'react';
import { editUser } from '../actions/users';
import '../styling/SimpleForms.css'

const UserEditForm = ({users, handleEditUser}) => {
    const [searchUser, setSearchUser] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [accountEdited, setAccountEdited] = useState(false)

    const [updatedUser, setUpdatedUser] = useState({
        id: '',
        first_name: '',
        last_name: '',
        role: '',
    })
    const [showEditForm, setShowEditForm] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

    const showSuccessMessage = () => {
        setAccountEdited(true)
  
        setTimeout(() => {
          setAccountEdited(false)
        }, 5000)
    }
    
    const sortUsers = (users) => {
        const sorted = users.sort((a,b) => {
          const sortByLastName = a.last_name.localeCompare(b.last_name);
          if (sortByLastName !== 0) {
            return sortByLastName;
          } else {
            return a.first_name.localeCompare(b.first_name);
          }
        })
        return sorted
    } 

    const handleChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const resp = await editUser(updatedUser.id, updatedUser)
        if (resp.errors) {
            setErrorMessages(resp.errors)
        } else {
            setShowEditForm(false)
            setErrorMessages([])
            handleEditUser(resp);
            showSuccessMessage()
            setUpdatedUser({
                id: '',
                first_name: '',
                last_name: '',
                role: '',
            })
        }        
    }

    const handleCancel = () => {
        setUpdatedUser({
            id: '',
            first_name: '',
            last_name: '',
            role: '',
        });
        setShowEditForm(false);
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchUser(query);
        const filtered = users.filter(
          (user) =>
            user.last_name.toLowerCase().includes(query)
        );
        setFilteredUsers(sortUsers(filtered));
    };

    const handleEditClick = (user) => {
        setUpdatedUser(user);
        setSearchUser('')
        setShowEditForm(true);
    }

    const listFilteredUsers = searchUser === '' ? [] : filteredUsers.map((user) => (
        <tr key={user.id}>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.role}</td>
            <td>
                <button className="pure-button" onClick={() => handleEditClick(user)}>Edit</button>
            </td>
        </tr>
    ));

    const renderErrors = errorMessages.map((message, index) => <div className="container"><h3 key={index} className="error">{message}</h3></div>);

    return (
        <div className="container">
            <h1>User Edit Form</h1>
            <br />
            {renderErrors}
            {accountEdited && (
                <h3>Account Successfully Edited!</h3>
            )}
            <div>
                <label>Search by Name:</label>
                <input type="text" name="search" value={searchUser} onChange={handleSearch} />
            </div>
            <h3>Search Results:</h3>
            <table className="results-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listFilteredUsers}
                </tbody>
            </table>
            <br />

            {showEditForm && (
                <form className="edit-form" onSubmit={handleEditSubmit}>
                    <div>
                        <label>First Name: </label>
                        <input type="text" name="first_name" value={updatedUser.first_name} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Last Name: </label>
                        <input type="text" name="last_name" value={updatedUser.last_name} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Role: </label>
                        <select name="role" value={updatedUser.role} onChange={handleChange}>
                            <option value="admin">Admin</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                            <option value="parent">Parent</option>
                        </select>
                    </div>
                    <div>
                        <br/>
                        <button type="submit" value="Submit" className="pure-button">Submit Changes</button>
                    </div>
                    <div>
                        <button type="button" onClick={handleCancel} className="pure-button">Cancel</button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default UserEditForm;



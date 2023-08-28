import React, {useState} from 'react';
import { editUser } from '../actions/users';

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

    const [errorMessages, setErrorMessages] = useState([])

    const showSuccessMessage = () => {
        setAccountEdited(true)
  
        setTimeout(() => {
          setAccountEdited(false)
        }, 5000)
      }


    const handleChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const resp = await editUser(updatedUser.id, updatedUser)
        if (resp.errors) {
            console.log(resp.errors)
            setErrorMessages(resp.errors)
        } else {
            setErrorMessages([])
            handleEditUser(resp);
            showSuccessMessage()
        }        
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchUser(query);
        const filtered = users.filter(
          (user) =>
            user.last_name.toLowerCase().includes(query)
        );
        setFilteredUsers(filtered);
      };

      const handleEditClick = (user) => {
        setUpdatedUser(user);
        setSearchUser('')
      }

      const listFilteredUsers = searchUser === '' ? [] : filteredUsers.map((user) => (
        <tr key={user.id}>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.role}</td>
            <td>
                <button onClick={() => handleEditClick(user)}>Edit</button>
            </td>
        </tr>
    ));

    const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);

    return (
        <div style={{marginLeft: '50px'}}>
            <h1>User Edit Form</h1>
            <br />
            {renderErrors}
            { accountEdited ? (
              <h3>Account Successfully Edited!</h3>
             ) : null
            }
            <div>
                <label>Search by Name:</label>
                <input
                type="text"
                name="search"
                value={searchUser}
                onChange={handleSearch}
                />
            </div>
            <h3>Search Results:</h3>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {listFilteredUsers}
                </tbody>
            </table>
            <br />

            <form onSubmit={handleEditSubmit}>
                <label>First Name: </label>
                <input type="text" name="first_name" value={updatedUser.first_name} onChange={handleChange} />
                <label>Last Name: </label>
                <input type="text" name="last_name" value={updatedUser.last_name} onChange={handleChange} />
                <label>Role: </label>
                <input type="text" name="role" value={updatedUser.role} onChange={handleChange} />
                <button type="submit" value="Submit" className="pure-button pure-button-primary">Submit Changes</button>
            </form>
        </div>
    );
}

export default UserEditForm;



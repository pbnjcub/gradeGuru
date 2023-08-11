import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { editUser } from '../actions/users';


const UserEditForm = ({users, handleEditUser}) => {
    const [searchUser, setSearchUser] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [updatedUser, setUpdatedUser] = useState({
        id: '',
        first_name: '',
        last_name: '',
        role: '',
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editUser(updatedUser.id, updatedUser)
            .then((data) => {
                handleEditUser(data);
            })
            .catch((error) => {
                console.log(error);
            });
        
        navigate(`/admin`);
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

      const listFilteredUsers = searchUser === '' ? [] : filteredUsers.map((user) => (
        <tr key={user.id}>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.role}</td>
            <td>
                <button onClick={() => setUpdatedUser(user)}>Edit</button>
            </td>
        </tr>
    ));


    return (
        <div>
            <h1>User Edit Form</h1>
            <div>
                <label>Search by Name:</label>
                <input
                type="text"
                name="search"
                value={searchUser}
                onChange={handleSearch}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <h3>Search Results:</h3>
                    </tr>
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



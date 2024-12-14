import {React, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Users = () => {
    const [users, setUsers] = useState([]);
    const navigate=useNavigate();

    const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/v1/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    };

  useEffect(()=>{ fetchUsers() },[])

  const deleteUser = async(userId) => {
    try {
      await axios.delete(`/api/v1/user/${userId}`);
    } catch(error) {
      console.log('Error deleting user:', error);
    }
  }

  const editUser=async(userId)=>{
    navigate(`/edit-user/${userId}`);
  }

  return (
    <div>
      <h1 className='text-center admin-heading'>ALL USERS</h1>
      <table className='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td><EditIcon onClick={() => editUser(user._id)} /> <DeleteIcon onClick={() => deleteUser(user._id)} /></td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  )
}

export default Users;
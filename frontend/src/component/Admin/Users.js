import {React, useState, useEffect} from 'react';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';

const Users = () => {
    const [users, setUsers]=useState([]);
    const fetchUsers= async()=>{
        try {
            const response = await axios.get('/api/v1/users');
            setUsers(response.data);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
    }

    useEffect(()=>{ fetchUsers() },[]);

    const deleteUser = async(userId) =>{
      try{
        await axios.delete(`/api/v1/deluser/${userId}`);
        window.location.reload();
      }
      catch (error){
        console.log('Error deleting user:', error);
      }
    }
  return (
    <div>
      <h1 className='text-center admin-heading'>ALL USERS</h1>
      <div className='table-box'>
      <table className='table'>
      <thead>
        <tr>
          <th>UserId</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td> <DeleteIcon onClick={()=> deleteUser(user._id)}/> </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </div>
  )
}

export default Users

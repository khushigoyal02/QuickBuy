import {React, useState, useEffect} from 'react';
import axios from 'axios';
import './UserInfo.css';
import DefaultPic from "../../images/DefaultPic.jpg";

const UserInfo = () => {
    const [user,setUser]=useState(null);
    const userId=localStorage.getItem('userId');

    const fetchUser=async()=>{
        try{
            const response=await axios.get(`/api/v1/user-data/${userId}`);
            setUser(response.data);
        }catch(error){
            console.log('Error fetching user data:', error);
        }
    }

    useEffect(()=>{ fetchUser() }, [])

  return (
    <div>
      {user ? (
        <div className='row profile container-fluid p-3'>
          <h1>MY PROFILE</h1>
          <div className='col-md-6 pic'>
            <img
              src={user.profilePic ? `http://localhost:5000/${user.profilePic}` : DefaultPic}
              alt="Profile"
            />
          </div>
          <div className='col-md-6 '>
            <div className='m-5 info'>
            <h4>Full Name</h4>
            <p>{user.name}</p>
            </div>
            <div className='m-5 info'>
            <h4>Email</h4>
            <p>{user.email}</p>
            </div>
            <div className='m-5 info'>
            <h4>Joined On</h4>
            <p>{String(user.createdAt.substr(0,10))}</p>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default UserInfo

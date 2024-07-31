import {React, useState, useEffect} from 'react';
import axios from 'axios';
import Panel from './Panel.js';
import DefaultPic from "../../images/DefaultPic.jpg";

const Profile = () => {
  const userId = localStorage.getItem('userId');
  const [showPanel, setShowPanel] = useState(false);
  const [profilePic, setProfilePic] = useState(null); // State for the profile picture

  const fetchUser=async()=>{
    try{
        const response=await axios.get(`/api/v1/user-data/${userId}`);
        setProfilePic(response.data.profilePic);
    }catch(error){
        console.log('Error fetching user data:', error);
    }
}

useEffect(()=>{ fetchUser() }, [userId])

  const handleMouseEnter = () => {
    setShowPanel(true);
  };

  const handleMouseLeave = () => {
    setShowPanel(false);
  };

  return (
    <div
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    >
        <img
        src={profilePic ? `http://localhost:5000/${profilePic}` : DefaultPic} // Use a default image if no profile picture
        alt="Profile"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
        }}
      />
        { showPanel && <Panel/> }
    </div>
  )
}

export default Profile

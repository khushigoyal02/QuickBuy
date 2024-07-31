import {React, useState, useEffect} from 'react';
import './Home.css';
import Profile from '../User/Profile.js';

const Home = () => {
  const [profile, showProfile]=useState(false);
  const userId=localStorage.getItem('userId');

  useEffect(()=>{
    if (userId) showProfile(true);
  }, [])

  return (
    <>
    <div className="banner row">
      <div className='col-md-11 main'> <h1>Welcome to QuickBuy</h1> </div>
      <div className='col-md-1 pt-5'> { profile && <Profile/> } </div>
    </div>
    </>
  )
}

export default Home

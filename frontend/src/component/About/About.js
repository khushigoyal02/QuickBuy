import React from 'react';
import './About.css';
import profile from '../../images/AboutPic.jpeg';

const About = () => {
  return (
    <div className='about'>
      <h2 className='my-4'>About Us</h2>
      <img src={profile} />
      <h4 className='mt-3'>Khushi Goyal</h4>
      <h5>Full Stack Developer</h5>
    </div>
  )
}

export default About

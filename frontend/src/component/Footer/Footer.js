import React from 'react';
import appstore from '../../images/appstore.png';
import playstore from '../../images/playstore.png';
import './Footer.css';

const Footer = () => {
  return (
      <div id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playstore}/>
        <img src={appstore}/>
      </div>

      <div className="midFooter">
        <h1>QUICKBUY.</h1>
        <p>High Quality is our first priority</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://in.linkedin.com">LinkedIn</a>
        <a href="https://www.instagram.com">Instagram</a>
        <a href="https://www.facebook.com">Facebook</a>
      </div>
      </div>
  )
}

export default Footer

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <h1>QuickBuy</h1>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item mx-2"> <Link to="/" className='text-decoration-none text-dark fs-4'>HOME</Link> </li>
        <li class="nav-item mx-2"> <Link to="/products" className='text-decoration-none text-dark fs-4'>PRODUCTS</Link> </li>
        <li class="nav-item mx-2"> <Link to="/about" className='text-decoration-none text-dark fs-4'>ABOUT</Link> </li>
        <li class="nav-item fs-4 mx-5"> {isAuthenticated ? (
          <button onClick={()=>{localStorage.clear(); setIsAuthenticated(false); window.location.replace('/');}}>Logout</button>
        ) : (
          <Link to="/login" className='text-decoration-none'><button>Login</button></Link>
        )}</li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar

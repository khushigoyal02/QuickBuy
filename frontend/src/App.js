import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Home from './component/Home/Home.js';
import Footer from './component/Footer/Footer.js';
import ProductList from './component/Product/ProductList.js';
import ProductDetails from "./component/Product/ProductDetails.js";
import Form from './component/User/Form.js';
import Cart from './component/Cart/Cart.js';
import About from './component/About/About.js';
import Products from './component/Admin/Products.js';
import Users from './component/Admin/Users.js';
import UserInfo from './component/User/UserInfo.js';

function App() {
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
	<Router>
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
              
    <div className="route-comp">
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/products" element={<ProductList/>} />
        <Route exact path="/products/:id" element={<ProductDetails/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/login" element={<Form/>} />
        <Route exact path="/cart-items" element={<Cart/>} />
        <Route exact path="/profile" element={<UserInfo/>} />

        <Route exact path="/all-products" element={<Products/>} />
        <Route exact path="/users" element={<Users/>} />
      </Routes>
    </div>
    
    <Footer/>

	</Router>
  );
}

export default App;

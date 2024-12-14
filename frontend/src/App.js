import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Navbar from './component/Navbar/Navbar.js';
import Home from './component/Home/Home.js';
import Footer from './component/Footer/Footer.js';
import ProductList from './component/Product/ProductList.js';
import ProductDetails from "./component/Product/ProductDetails.js";
import Form from './component/User/Form.js';
import Cart from './component/Cart/Cart.js';
import ShippingDetails from './component/Place Order/ShippingDetails.js';
import CardInfo from './component/Place Order/CardInfo.js';
import Confirmation from './component/Place Order/Confirmation.js';
import UserOrders from './component/User/UserOrders.js';
import About from './component/About/About.js';
import Products from './component/Admin/Products.js';
import AddProduct from './component/Admin/AddProduct.js';
import EditProduct from './component/Admin/EditProduct.js';
import Users from './component/Admin/Users.js';
import EditUser from './component/Admin/EditUser.js';
import Orders from './component/Admin/Orders.js';
import UserInfo from './component/User/UserInfo.js';

function App() {

  return (
	<Router>
    <Navbar/>

    <div className="route-comp">
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/products" element={<ProductList/>} />
        <Route exact path="/products/:id" element={<ProductDetails/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/login" element={<Form/>} />
        <Route exact path="/cart-items" element={<Cart/>} />
        <Route exact path="/shipping" element={<ShippingDetails/>} />
        <Route exact path="/card-info" element={<CardInfo/>} />
        <Route exact path="/confirm" element={<Confirmation/>} />
        <Route exact path="/my-orders" element={<UserOrders/>} />
        <Route exact path="/profile" element={<UserInfo/>} />

        <Route exact path="/all-products" element={<Products/>} />
        <Route exact path="/add-product" element={<AddProduct/>} />
        <Route exact path="/edit-product/:id" element={<EditProduct/>} />
        <Route exact path="/all-users" element={<Users/>} />
        <Route exact path="/edit-user/:userId" element={<EditUser/>} />
        <Route exact path="/all-orders" element={<Orders/>} />
      </Routes>
    </div>
    
    <Footer/>
	</Router>
  );
}

export default App;

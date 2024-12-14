const User = require('../models/userModel');
const Order = require('../models/orderModel');
const catchAsyncErrors = require("../catchAsyncErrors");

// Create a new order
exports.createOrder=catchAsyncErrors(async(req,res)=>{
    const { userId, formData }=req.body;

    // Retrieve the user's details including the cart
    const user = await User.findById(userId);
    const amount= user.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalQuantity = user.cart.reduce((total, item) => total + item.quantity, 0);

    // Create a new order with cart items
    const newOrder = new Order({
        userId,
        items: user.cart,
        totalQuantity,
        amount,
        shippingDetails: formData
    });

    // Save the order to the database
    await newOrder.save();

    // Clear the user's cart after placing the order
    user.cart = []; 
    await user.save(); 

    return res.status(201).json({ message: "Order placed successfully", orderId: newOrder._id });
})

exports.getUserOrders=catchAsyncErrors(async(req,res)=>{
    const { userId } = req.params;

    // Find orders by userId
    const orders = await Order.find({ userId })

    if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found for this user." });
    }

    return res.status(200).json(orders);
})

exports.getAllOrders=catchAsyncErrors(async(req,res)=>{
    const orders = await Order.find()

    if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found." });
    }

    return res.status(200).json(orders);
})
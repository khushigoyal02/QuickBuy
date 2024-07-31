const catchAsyncErrors = require("../catchAsyncErrors");
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const validator=require('validator');
const { sendRegistrationEmail } = require('../emailService');
const upload = require('../upload');

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  upload(req,res, async(err)=>{
    if (err) {
      return res.status(400).json({ message: err });
    }
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Email is not valid' });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({ 
    name, 
    email, 
    password: hashedPassword, 
    profilePic: req.file ? req.file.path : null // Store the path to the uploaded file
  });

  await newUser.save();
  await sendRegistrationEmail(email, name);
  res.json({ userId: newUser._id, role: newUser.role});
  })
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const user = await User.findOne({ email });
  if (!user){ 
    return res.status(400).json({ message: 'Invalid Credentials' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch){
    return res.status(400).json({ message: 'Invalid Credentials' });
  }
  res.json({ userId: user._id, role: user.role});
});

// Fetch User Data
exports.fetchUser=catchAsyncErrors(async(req,res)=>{
  const userId=req.params.userId;
  const user=await User.findById(userId);
  res.json(user);
})

// Display Users -- Admin
exports.displayUsers=catchAsyncErrors(async (req,res)=>{
  const users=await User.find({});
  res.json(users);
})

// Delete User -- Admin
exports.deleteUser=catchAsyncErrors(async (req,res)=>{
  await User.findByIdAndDelete(req.params.id);
})
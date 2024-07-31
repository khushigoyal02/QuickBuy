const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  imageurl: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String }, // Field for storing the profile picture path
  role: { type: String, default: "User" },
  createdAt: { type: Date, default: Date.now },
  cart: [cartSchema]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
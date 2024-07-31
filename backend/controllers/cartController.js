const User = require('../models/userModel');
const catchAsyncErrors = require("../catchAsyncErrors");

// Add To Cart
exports.addToCart = catchAsyncErrors(async (req, res) => {
    const { userId, productId, imageurl, name, quantity, price} = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const existingProduct = user.cart.find((product) => product.productId == productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      user.cart.push({ productId, imageurl, name, quantity, price });
    }
    await user.save();

    res.status(200).json({ message: 'Product added to cart successfully' });
});

// Get Cart Items
exports.getCartItems=catchAsyncErrors(async(req,res,next)=>{
  const userId = req.params.userId;
  const user = await User.findById(userId);

  const cartItems = user.cart;
  res.json(cartItems);
})

// Update Cart
exports.updateQuantity=catchAsyncErrors(async(req, res)=>{
      const userId = req.params.userId;
      const productId = req.params.productId;
      const { quantity } = req.body;

      const user = await User.findById(userId);
      const cart=user.cart;
      const productIndex = cart.findIndex((product) => product.productId == productId);
      if (productIndex !== -1) {
        cart[productIndex].quantity = quantity;
      }
      await user.save();
      res.json({ message: 'Product quantity updated in cart successfully' });
})

// Delete From Cart
exports.deletefromCart=catchAsyncErrors(async(req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  const user = await User.findById(userId);
  user.cart = user.cart.filter(item => item.productId != productId);
  await user.save();

  res.json({ message: 'Product removed from cart successfully' });
})
const Product = require("../models/productModel");
const catchAsyncErrors = require("../catchAsyncErrors");

// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const products=await Product.find({});
  res.json(products);
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// Add Product -- Admin
exports.addProduct=catchAsyncErrors(async(req,res)=>{
  const { name, description, price, rating, imageurl, stock } = req.body;

    const newProduct = new Product({
        name,
        description,
        price,
        rating,
        imageurl,
        stock
    });

    await newProduct.save(); // Save the product to the database

    return res.status(201).json({ message: "Product created successfully", productId: newProduct._id });
})

// Edit Product -- Admin
exports.editProduct=catchAsyncErrors(async(req,res)=>{
  const productId = req.params.id; // Get the product ID from the request parameters
    const { name, description, price, rating, imageurl, stock } = req.body; // Get updated data from the request body

        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            name,
            description,
            price,
            rating,
            imageurl,
            stock
        }, { new: true }); // Return the updated document

        return res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
})

// Delete Product -- Admin
exports.deleteProduct = catchAsyncErrors(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  
})
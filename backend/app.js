const express = require("express");
const path = require('path');
const app = express();

//Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const cart=require("./routes/cartRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", cart);

module.exports=app;
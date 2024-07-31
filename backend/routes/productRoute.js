const express = require("express");
const { getAllProducts, getProductDetails, deleteProduct } = require("../controllers/productController");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/:id").get(getProductDetails);
router.delete("/delproduct/:id", deleteProduct);

module.exports = router;

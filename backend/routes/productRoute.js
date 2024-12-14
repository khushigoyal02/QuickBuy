const express = require("express");
const { getAllProducts, getProductDetails, addProduct, editProduct, deleteProduct } = require("../controllers/productController");
const router = express.Router();

router.route("/products").get(getAllProducts).post(addProduct);
router.route("/products/:id").get(getProductDetails).delete(deleteProduct).put(editProduct);

module.exports = router;

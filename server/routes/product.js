const express = require("express");
const isAuth = require("../middlewares/is-auth");
const productController = require("../controllers/product");
const router = express.Router();

router.get("/products", productController.getProducts);
router.post("/product", isAuth, productController.addProduct);
router.get("/product/:id", productController.getProduct);

router.post("/create-payment-intent", isAuth ,productController.checkout);

module.exports = router;

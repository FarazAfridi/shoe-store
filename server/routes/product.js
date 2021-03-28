const express = require("express");
const isAuth = require("../middlewares/is-auth");
const productController = require("../controllers/product");
const router = express.Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.get("/products", isAuth, productController.getProducts);
router.post("/product", isAuth, productController.addProduct);
router.post("/create-payment-intent", async (req, res) => {
  const calculateOrderAmount = (items) => {
    const total = items.reduce(
      (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
      0
    );
    return total;
  };

  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

module.exports = router;

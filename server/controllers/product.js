const Product = require("../models/product");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.getProducts = (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).json({
        message: "Fetched successfully",
        products,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res) => {
  const { id } = req.params;
  Product.findById(id).then((product) => {
    res
      .status(200)
      .json({
        product,
      })
  }).catch(err => res.status(500).json({message: err.message}))
};

exports.addProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const product = new Product({
    title,
    imageUrl,
    price,
  });
  product
    .save()
    .then((product) => {
      res.status(201).json({
        message: "Product added to database succesfully",
        product,
      });
    })
    .catch((err) => console.log(err));
};

exports.checkout =  async (req, res) => {
  const calculateOrderAmount = (items) => {
    const total = items.reduce(
      (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
      0
    );
    return total * 100;
  };

  const { items } = req.body;
  console.log(calculateOrderAmount(items))
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
}
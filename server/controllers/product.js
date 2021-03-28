const Product = require("../models/product");

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

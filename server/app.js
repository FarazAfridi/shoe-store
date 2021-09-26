const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
app.use('/api', productRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 4000;

mongoose
  .connect(
    process.env.MONGODB_KEY,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then((result) => {
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
import React, { useContext, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { CartContext } from "./../../context/cart-context/cart-context";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Admin = () => {
  const [product, setProduct] = useState({
    title: "",
    imageUrl: "",
    price: "",
  });
  console.log(product)
  const { setProducts, user, addProduct } = useContext(CartContext);
  const classes = useStyles();

  const signInHandler = async (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/api/product", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `bearar ${user}`,
      },
      body: JSON.stringify({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
          setProducts(resData.products)
        addProduct(product)
        })
      .catch((err) => console.log(err));
  };

  function handleChange(event) {
    const { name, value } = event.target;

    setProduct((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Title"
              name="title"
              autoFocus
                  value={product.title}
                onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="ImageUrl"
              name="imageUrl"
              autoFocus
                  value={product.imageUrl}
                onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
                  value={product.price}
                onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={signInHandler}
            >
              Add Product
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Admin;

import React, { useContext } from "react";
import { Card, Grid, Typography, Button } from "@material-ui/core";
import { CartContext } from "../../context/cart-context/cart-context";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router";

const useStyles = makeStyles((theme) => ({
  gridStyles: {
    margin: "50px 20px",
    boxShadow: "2px 4px 6px grey",
    borderRadius: "20px",
    color: "black",
  },
  imageStyles: {
    borderRadius: "10px",
    margin: "10px 0",
    width: "85%",
    height: "350px",
  },
  label: {
    width: "100%",
  },
}));

export default function Shop() {
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();
  console.log(cartContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.label} spacing={3} justify="center">
      {cartContext.products &&
        cartContext.products.map((item) => (
          <Grid
            item
            component={Card}
            xs={10}
            md={3}
            key={item._id}
            className={classes.gridStyles}
          >
            <div onClick={() => navigate(`/productDetails/${item._id}`)}>
              <Typography variant="h5">{item.name}</Typography>

              <img
                className={classes.imageStyles}
                src={item.imageUrl}
                alt={item.name}
              />
              <Typography variant="h6">${item.price}</Typography>
            </div>
            <Button
              onClick={() => {
                cartContext.addItem(item);
              }}
              variant="outlined"
              color="primary"
            >
              Add to cart
            </Button>
          </Grid>
        ))}
    </Grid>
  );
}

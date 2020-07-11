import React, { useContext } from "react";
import { Button, Paper, Typography } from "@material-ui/core";
import "./cart-drop-down.styles.css";
import CartItem from "./../cart-item/cart-item";
import { CartContext } from "../../context/cart-context/cart-context";
import { Link } from 'react-router-dom';

const CardDropDown = () => {
  const { cartItems, toggleHidden } = useContext(CartContext);

  return (
    <Paper className="cart-dropdown" elevation={3} >
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <Typography>Your cart is empty</Typography>
        )}
      </div>
      <Button
        className='cart-dropdown-button'
        variant="outlined"
        color="primary"
      >
       <Link to='/checkout' className='cart-dropdown-link' onClick={toggleHidden}> Go to cart </Link>
      </Button>
    </Paper>
  );
};

export default CardDropDown;

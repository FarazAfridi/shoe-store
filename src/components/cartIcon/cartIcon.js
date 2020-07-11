import React, { useContext } from "react";
import { ReactComponent as ShopingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../context/cart-context/cart-context";
import './cartIcon.styles.css';

const CartIcon = () => {
  const { toggleHidden, cartItemCount } = useContext(CartContext);

  return (
    <div onClick={toggleHidden}
     className='cartIcon-container'
    >
      <ShopingIcon className='cartIcon' />
      <span className='cartIcon-span' >
        {cartItemCount}
      </span>
    </div>
  );
};

export default CartIcon;

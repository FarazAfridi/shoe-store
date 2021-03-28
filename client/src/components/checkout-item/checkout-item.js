import React, { useContext } from 'react';
import './checkout-item.styles.css';
import { CartContext } from '../../context/cart-context/cart-context';


const CheckoutItem = ({ cartItem }) => {
    const {title, imageUrl, price, quantity} = cartItem;
    const { addItem, removeItem, clearItemFromCart } = useContext(CartContext);

    return ( <div className="checkout-item">
        <div className="image-container">
        <img src={imageUrl} alt={title}/>
        </div>
        <span className="name">{title}</span>
        <span className="quantity">
        <div className="arrow" onClick={() => removeItem(cartItem)}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(cartItem)}>&#10095;</div>
        </span>
        <span className="price">${price}</span>
        <div className="remove-button" onClick={() => clearItemFromCart(cartItem)}>&#10005;</div>
    </div> );
}
 
export default CheckoutItem;
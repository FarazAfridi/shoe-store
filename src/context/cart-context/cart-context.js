import React, { useState, createContext, useEffect } from 'react';
import { addCartItem, getItemCount, getTotal, filterItemFromCart,removeItemFromCart } from './utils';

export const  CartContext = createContext({
    hidden: true,
    toggleHidden: () => {},
    cartItems: [],
    addItem: () => {},
    removeItem: () => {},
    clearItemFromCart: () => {},
    cartItemCount: 0,
    cartItemTotal: 0,
});

const CartProvider = ({ children }) => {
    const [hidden, setHidden] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemCount, setCartItemsCount] = useState(0);
    const [cartItemTotal, setCartItemTotal] = useState(0);

    useEffect(() => {
        setCartItemsCount(getItemCount(cartItems));
        setCartItemTotal(getTotal(cartItems));
    }, [cartItems]);

    const toggleHidden = () => setHidden(!hidden);
    const addItem = (item) => setCartItems(addCartItem(cartItems, item));
    const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));
    const clearItemFromCart = item => setCartItems(filterItemFromCart(cartItems, item));

    return <CartContext.Provider value={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        cartItemCount,
        cartItemTotal,
        removeItem,
        clearItemFromCart
    }} >
    {children}</CartContext.Provider>
}
    
export default CartProvider;
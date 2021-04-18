import React, { useState, createContext, useEffect } from "react";
import {
  addCartItem,
  getItemCount,
  getTotal,
  filterItemFromCart,
  removeItemFromCart,
  logoutUser,
} from "./utils";
export const CartContext = createContext({
  user: null,
  hidden: true,
  toggleHidden: () => {},
  products: [],
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  logout: () => {},
  cartItemCount: 0,
  cartItemTotal: 0,
  productsCount: 0,
  addProduct: () => {},
});

const CartProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartItemCount, setCartItemsCount] = useState(0);
  const [cartItemTotal, setCartItemTotal] = useState(0);
  const [role, setRole] = useState(null);

  useEffect(() => {
    setCartItemsCount(getItemCount(cartItems));
    setCartItemTotal(getTotal(cartItems));
  }, [cartItems]);

  const toggleHidden = () => setHidden(!hidden);
  const addItem = (item) => setCartItems(addCartItem(cartItems, item));
  const removeItem = (item) =>
    setCartItems(removeItemFromCart(cartItems, item));
  const clearItemFromCart = (item) =>
    setCartItems(filterItemFromCart(cartItems, item));
  const logout = () => {
    setRole(null);
    setUser(logoutUser());
  };
  const addProduct = (item) => setProducts(addCartItem(products, item));
  return (
    <CartContext.Provider
      value={{
        user,
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        cartItemCount,
        cartItemTotal,
        removeItem,
        clearItemFromCart,
        products,
        logout,
        setProducts,
        setUser,
        setRole,
        role,
        addProduct
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

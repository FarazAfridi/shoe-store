import React, { useState, createContext, useEffect } from "react";
import {
  addCartItem,
  getItemCount,
  getTotal,
  filterItemFromCart,
  removeItemFromCart,
  logoutUser
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
});

const CartProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartItemCount, setCartItemsCount] = useState(0);
  const [cartItemTotal, setCartItemTotal] = useState(0);

  useEffect(() => {
    setCartItemsCount(getItemCount(cartItems));
    setCartItemTotal(getTotal(cartItems));
  }, [cartItems]);

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   setUser({ token });
    //   fetch("http://localhost:4000/api/products", {
    //     headers: {
    //       Authorization: `bearar ${token}`,
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then((resData) => setProducts(resData.products))
    //     .catch((err) => console.log(err));
    // } else {
    //   setUser(null)
    // }

    // fetch("http://localhost:4000/api/product", {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({
    //     title: 'Adidas Yeezy',
    //     imageUrl: 'https://i.ibb.co/dJbG1cT/yeezy.png',
    //     price: '280'
    //   })
    // })
    // .then((res) => res.json())
    // .then((resData) => setProducts(resData.products))
    // .catch((err) => console.log(err));
  }, []);

  const toggleHidden = () => setHidden(!hidden);
  const addItem = (item) => setCartItems(addCartItem(cartItems, item));
  const removeItem = (item) =>
    setCartItems(removeItemFromCart(cartItems, item));
  const clearItemFromCart = (item) =>
    setCartItems(filterItemFromCart(cartItems, item));
  const logout = () => setUser(logoutUser());

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

import React, { useContext, useEffect } from "react";
import "./App.css";
import {Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import { CartContext } from "./context/cart-context/cart-context";
import Shop from "./pages/shop/shop";
import Checkout from "./pages/checkout/checkout";
import LoginAndSignup from "./pages/loginAndSignup/loginAndSignup";
import { useNavigate } from 'react-router';
import { CheckoutPage } from "./pages/checkout/checkout-form";

function App() {
  const { user,setUser, setProducts } = useContext(CartContext);
  const navigation = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
      navigation('/')
      fetch("http://localhost:4000/api/products", {
        headers: {
          Authorization: `bearar ${token}`,
        },
      })
        .then((res) => res.json())
        .then((resData) => setProducts(resData.products))
        .catch((err) => console.log(err));
    } else {
      setUser(null)
      navigation('/login')
    }
  },[])

  return (
    <div className="App">
        <Navbar />
        <Routes>
        <Route path="/" element={user ? <Shop /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <LoginAndSignup isLogin={true} /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <LoginAndSignup isLogin={false} /> : <Navigate to="/" />} />    
          <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login" />} />
          <Route path="/checkout-page" element={user ? <CheckoutPage /> : <Navigate to="/login" />} />
          <Route path="*" element={<h1>404 Page not found</h1>} />
        </Routes>
    </div>
  );
}

export default App;

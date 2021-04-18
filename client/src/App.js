import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import {Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import { CartContext } from "./context/cart-context/cart-context";
import Shop from "./pages/shop/shop";
import Checkout from "./pages/checkout/checkout";
import LoginAndSignup from "./pages/loginAndSignup/loginAndSignup";
import { CheckoutPage } from "./pages/checkout/checkout-form";
import ProductDetails from './pages/productDetail/productDetail';
import Admin from './pages/admin/admin';

function App() {
  const { user,setUser, setProducts, role, setRole, products } = useContext(CartContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    if (token) {
      setUser(token);
      setRole(userRole)
    } else {
      setUser(null)
    }
  },[])

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
    .then((res) => res.json())
    .then((resData) => setProducts(resData.products))
    .catch((err) => console.log(err));
  }, [])

  return (
    <div className="App">
        <Navbar />
        <Routes>
        <Route path="/" element={<Shop /> } />
        <Route path="/productDetails/:id" element={<ProductDetails />} /> 
          <Route path="/login" element={<LoginAndSignup isLogin={true} /> } />
          <Route path="/admin" element={role ? <Admin /> :  <Navigate to="/" />} />
          <Route path="/signup" element={<LoginAndSignup isLogin={false} /> } />  
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-page" element={user ? <CheckoutPage /> : <Navigate to="/login" />} />
          <Route path="*" element={<h1>404 Page not found</h1>} />
        </Routes>
    </div>
  );
}

export default App;

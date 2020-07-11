import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Shop from "./components/shop/shop"
import Checkout from './components/checkout/checkout';
import CartProvider from "./context/cart-context/cart-context";

function App() {
  return (
    <CartProvider>
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path='*' element={<h1>404 Page not found</h1>} />
        </Routes>
      </Router>
    </div>
    </CartProvider>
  );
}

export default App;

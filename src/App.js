import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ProductList from './components/ProductList';
import Layout from './components/Layout';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';

function App() {
  const [cart, setCart] = useState([]);

  const taxRate = 0.15; // 15% tax rate

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalTax = subtotal * taxRate;
  const totalOwed = subtotal + totalTax;


  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ProductList" element={<ProductList cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<ShoppingCart cart={cart} setCart={setCart} />} />
          <Route path="/checkout" element={<Checkout totalOwed={totalOwed} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
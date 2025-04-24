// src/App.jsx

import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from "./Context/AuthContext";
import { useAuth } from './Context/AuthContext';
import NavBar from './components/NavBar';  // Import NavBar here
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import PasswordReset from "./components/Auth/PasswordReset";
import ShoeFilter from "./components/ShoeCategory";

import NavBar from "./components/NavBar"

import ShoeList from "./components/ShoesList";
import Cart from "./components/Cart";  // Import Cart page if you have one


function App() {
  const [shoeList, setShoeList] = useState([]);
  const [filteredShoes, setFilteredShoes] = useState([]);
  const [cart, setCart] = useState([]);  // State to store cart items

  useEffect(() => {
    fetch("http://localhost:4000/shoes")

    .then((res)=>res.json())
    .then((data)=>{
      setFilteredShoes(data)
      setShoeList(data)
    })
  },[])

  function handleAddToCart(shoe) {
    const alreadyInCart = cart.some(s => s.id === shoe.id);
    if (!alreadyInCart) {
      setCart(shoes => [...shoes, shoe]);
    }
  }

  function handleRemoveFromCart(shoe) {
    setCart(cartItem => cartItem.filter(s => s.id !== shoe.id));
  }
  
  return (
   <div style={{gap:10,display:"flex",flexDirection:"column", justifyContent:"center",alignContent:"center"}}>
    <AuthProvider>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/reset-password" element={<PasswordReset />} />
      </Routes>
    </AuthProvider>
    <ShoeFilter shoes={shoeList} setFilteredShoes={setFilteredShoes}/>
    <ShoeList shoes={filteredShoes}  />
    <Cart 
      cart={cart}
      onAddShoeToCart={handleAddToCart}
    />
    
    
  </div>


  )


  // Function to add items to cart
  const addToCart = (shoe) => {
    setCart((prevCart) => [...prevCart, shoe]);
  };

  // Function to remove items from cart
  const removeFromCart = (shoeId) => {
    setCart(cart.filter(item => item.id !== shoeId));
  };

  return (
    <div style={{ gap: 10, display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
      <AuthProvider>
        <NavBar cartCount={cart.length} />  {/* Pass cart count to NavBar */}
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home addToCart={addToCart} />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />  {/* Cart page */}
        </Routes>
      </AuthProvider>
      <ShoeFilter shoes={shoeList} setFilteredShoes={setFilteredShoes} />
      <ShoeList shoes={filteredShoes} addToCart={addToCart} />
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default App;

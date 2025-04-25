import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from "./Context/AuthContext";
import { useAuth } from './Context/AuthContext';
import NavBar from './components/NavBar';
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import PasswordReset from "./components/Auth/PasswordReset";
import Cart from "./components/Cart";

function App() {
  const [shoeList, setShoeList] = useState([]);
  const [filteredShoes, setFilteredShoes] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/shoes")
      .then((res) => res.json())
      .then((data) => {
        setFilteredShoes(data);
        setShoeList(data);
      });
  }, []);

  function handleAddToCart(order) {
    setCart(prevCart => [...prevCart, order]);
  }

  function handleRemoveFromCart(shoeToRemove) {
    setCart(prevCart => prevCart.filter(shoe => shoe.id !== shoeToRemove.id));
    fetch(`http://localhost:4000/cart/${shoeToRemove.id}`,{
      method:"DELETE"
    })
  }

  return (

    <AuthProvider>
      <div style={{ gap: 10, display: "flex", flexDirection: "column" }}>
        <NavBar cartCount={cart.length} />
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home 
                shoes={filteredShoes}
                onAddShoeToCart={handleAddToCart}
              />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart
                cart={cart}
                onRemoveShoeFromCart={handleRemoveFromCart}
              />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>

  );
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default App;
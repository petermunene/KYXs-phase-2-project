import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from "./Context/AuthContext"; 
import NavBar from './components/NavBar';
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import PasswordReset from "./components/Auth/PasswordReset";
import Cart from "./components/Cart";
import ErrorPage from "./components/ErrorPage";
import ShoeDetail from "./components/ShoeDetail";

function App() {
  const [shoeList, setShoeList] = useState([]);
  const [filteredShoes, setFilteredShoes] = useState([]);
  const [cart, setCart] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:4000/shoes")
      .then((res) => res.json())
      .then((data) => {
        setFilteredShoes(data);
        setShoeList(data);
      });

    fetch("http://localhost:4000/cart")
      .then((res) => res.json())
      .then((cartData) => setCart(cartData))
      .catch(console.error);
  }, []);

  const handleAddToCart = async (order) => {
    try {
      const response = await fetch("http://localhost:4000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
      });
      const newItem = await response.json();
      setCart(prev => [...prev, newItem]);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleUpdateQuantity = async (shoeId, newQuantity) => {
    try {
      setCart(prev => 
        prev.map(item => 
          item.id === shoeId ? {...item, quantity: newQuantity} : item
        )
      );
    
      await fetch(`http://localhost:4000/cart/${shoeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity })
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveFromCart = async (shoeId) => {
    try {
      setCart(prev => prev.filter(item => item.id !== shoeId));
      await fetch(`http://localhost:4000/cart/${shoeId}`, {
        method: "DELETE"
      });
    } catch (error) {
      console.error("Error removing item:", error);
      
    }
  };

  const handleClearCart = async () => {
    try {
      await Promise.all(
        cart.map(item => 
          fetch(`http://localhost:4000/cart/${item.id}`, { 
            method: "DELETE" 
          })
        )
      );
      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const isAuthPage = ['/login', '/signup', '/reset-password'].includes(location.pathname);

  return (
    <AuthProvider>
      {!isAuthPage && <NavBar cartCount={cart.length} />}
      
      <div style={{ padding: isAuthPage ? '0' : '20px' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Home 
                allShoes={shoeList}
                shoes={filteredShoes}
                onAddShoeToCart={handleAddToCart}
                setFilteredShoes={setFilteredShoes}
              />
            </ProtectedRoute>
          } />
          
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart
                cart={cart}
                onRemoveShoeFromCart={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
                onClearCart={handleClearCart}
              />
            </ProtectedRoute>
          } />

          <Route path="/shoes/:id" element={
            <ProtectedRoute>
              <ShoeDetail />
            </ProtectedRoute>
          } />

          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<ErrorPage errorMessage="Page not found" />} />
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
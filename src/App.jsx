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

  // Load initial data
  useEffect(() => {
    // Load shoes
    fetch("http://localhost:4000/shoes")
      .then((res) => res.json())
      .then((data) => {
        setFilteredShoes(data);
        setShoeList(data);
      });

    // Load cart from API
    fetch("http://localhost:4000/cart")
      .then((res) => res.json())
      .then((cartData) => setCart(cartData))
      .catch(console.error);
  }, []);

  // Add to cart with API sync
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

  // Update quantity with API sync
  const handleUpdateQuantity = async (shoeId, newQuantity) => {
    try {
      // Optimistic UI update
      setCart(prev => 
        prev.map(item => 
          item.id === shoeId ? {...item, quantity: newQuantity} : item
        )
      );
      
      // API update
      await fetch(`http://localhost:4000/cart/${shoeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity })
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
      // Optionally: Revert UI on error
    }
  };

  // Remove item with API sync
  const handleRemoveFromCart = async (itemId) => {
    try {
      await fetch(`http://localhost:4000/cart/${itemId}`, {
        method: 'DELETE',
      });
      // Update local cart state by filtering out the removed item
      setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item from cart.');
    }
  };
  

  const handleClearCart = async () => {
    try {
      const deleteRequests = cart.map(item => 
        fetch(`http://localhost:4000/cart/${item.id}`, {
          method: 'DELETE',
        })
      );
      await Promise.all(deleteRequests);
      setCart([]);
      alert('Cart cleared successfully!');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      alert('Failed to clear cart.');
    }
  };
  

  // Check if current route is authentication page
  const isAuthPage = ['/login', '/signup', '/reset-password'].includes(location.pathname);

  return (
    <AuthProvider>
      {!isAuthPage && <NavBar cartCount={cart.length} />}
      
      <div style={{ padding: isAuthPage ? '0' : '20px' }}>
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          
          {/* Main App Routes */}
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
          
          {/* Redirects */}
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
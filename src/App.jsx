import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from "./Context/AuthContext"; // Added useAuth import
import NavBar from './components/NavBar';
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import PasswordReset from "./components/Auth/PasswordReset";
import Cart from "./components/Cart";
import ErrorPage from "./components/ErrorPage";

function App() {
  const [shoes, setShoes] = useState([]);
  const [cart, setCart] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:4000/shoes")
      .then((res) => res.json())
      .then((data) => setShoes(data)); 
  }, []);


  function handleAddToCart(shoe) {
    setCart(prevCart => [...prevCart, shoe]);

  function handleAddToCart(order) {
    setCart(prevCart => [...prevCart, order]);
    

  }

  function handleRemoveFromCart(shoeToRemove) {
    setCart(prevCart => prevCart.filter(shoe => shoe.id !== shoeToRemove.id));

    
    fetch(`http://localhost:4000/cart/${shoeToRemove.id}`, {
      method: "DELETE",
    })
    .catch(err => console.error("Failed to remove shoe:", err)); 
  }

    fetch(`http://localhost:4000/cart/${shoeToRemove.id}`, {
      method: "DELETE"
    });
  }

  // Check if current route is authentication page
  const isAuthPage = ['/login', '/signup', '/reset-password'].includes(location.pathname);

  return (
    <AuthProvider>
      {!isAuthPage && <NavBar cartCount={cart.length} />}
      
      <div style={{ padding: isAuthPage ? '0' : '20px' }}>
        <Routes>

          {/* No ProtectedRoute around Home anymore */}
          <Route path="/" element={<Home shoes={shoes} onAddShoeToCart={handleAddToCart} />} />
          

          {/* Authentication Routes (no navbar) */}

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          

          {/* ProtectedRoute around Cart */}

          {/* Main App Routes (protected, with navbar) */}
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
              <Cart cart={cart} onRemoveShoeFromCart={handleRemoveFromCart} />
            </ProtectedRoute>
          } />
          

          <Route path="*" element={<Navigate to="/" replace />} />

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<ErrorPage errorMessage="Page not found" />} />

        </Routes>
      </div>
    </AuthProvider>
  );
}

// Move ProtectedRoute outside the App component
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default App;

import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Context/AuthContext';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import PasswordReset from './components/Auth/PasswordReset';
import Cart from './components/Cart';
import ErrorPage from './components/ErrorPage';
import "./index.css";

function App() {
  const [shoeList, setShoeList] = useState([]);
  const [filteredShoes, setFilteredShoes] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load shoes
    fetch("http://localhost:4000/shoes")
      .then(res => res.json())
      .then(data => {
        setFilteredShoes(data);
        setShoeList(data);
      });

    // Load cart
    fetch("http://localhost:4000/cart")
      .then(res => res.json())
      .then(setCart);
  }, []);

  const handleAddToCart = (order) => {
    fetch("http://localhost:4000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    })
    .then(res => res.json())
    .then(newItem => {
      alert("Item added to cart successfully!")
      setCart(prev => [...prev, newItem]);
      
    })
    .catch(error => {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    });
  };

  const handleRemoveFromCart = (shoeId) => {
    fetch(`http://localhost:4000/cart/${shoeId}`, { method: "DELETE" })
    .then(() => {
      setCart(prev => prev.filter(item => item.id !== shoeId));
      alert("Item removed from cart!");
    })
    .catch(error => {
      console.error("Error removing from cart:", error);
      alert("Failed to remove item. Please try again.");
    });
  };

  return (
    <AuthProvider>
      <NavBar cartCount={cart.length} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home 
                shoes={shoeList}
                filteredShoes={filteredShoes}
                setFilteredShoes={setFilteredShoes}
                onAddShoeToCart={handleAddToCart}
              />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart cart={cart} onRemoveShoeFromCart={handleRemoveFromCart} />
            </ProtectedRoute>
          } />
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

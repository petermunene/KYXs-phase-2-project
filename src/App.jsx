import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from "./Context/AuthContext";
import NavBar from './components/NavBar';
import Home from "./components/Home";
import ShoeList from "./components/ShoesList";
import ShoeCategory from "./components/ShoeCategory";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import PasswordReset from "./components/Auth/PasswordReset";
import Cart from "./components/Cart";
import ErrorPage from "./components/ErrorPage";
import ShoeDetail from "./components/ShoeDetail";
import AdminDashboard from "./components/admin/AdminDashboard";

const BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:4000"
  : "https://my-app-backend-hvge.onrender.com/api";

function App() {
  const [shoeList, setShoeList] = useState([]);
  const [filteredShoes, setFilteredShoes] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Load shoes
        const shoesResponse = await fetch(`${BASE_URL}/shoes`);
        const shoesData = await shoesResponse.json();
        setShoeList(shoesData);
        setFilteredShoes(shoesData);

        // Load cart if authenticated
        if (user) {
          const cartResponse = await fetch(`${BASE_URL}/cart`, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
          const cartData = await cartResponse.json();
          setCart(cartData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleAddToCart = async (order) => {
    if (!user) {
      return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    try {
      const response = await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(order)
      });
      const newItem = await response.json();
      setCart(prev => [...prev, newItem]);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleUpdateQuantity = async (shoeId, color, newQuantity) => {
    try {
      const uniqueId = `${shoeId}-${color}`;
      setCart(prev => 
        prev.map(item => 
          `${item.id}-${item.color}` === uniqueId 
            ? {...item, quantity: newQuantity} 
            : item
        )
      );
      
      await fetch(`${BASE_URL}/cart/${uniqueId}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ quantity: newQuantity })
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveFromCart = async (shoeId, color) => {
    try {
      const uniqueId = `${shoeId}-${color}`;
      setCart(prev => prev.filter(item => `${item.id}-${item.color}` !== uniqueId));
      await fetch(`${BASE_URL}/cart/${uniqueId}`, { 
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await Promise.all(
        cart.map(item => 
          fetch(`${BASE_URL}/cart/${item.id}-${item.color}`, { 
            method: "DELETE",
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })
        )
      );
      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const addNewShoe = async (newShoe) => {
    try {
      const response = await fetch(`${BASE_URL}/shoes`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(newShoe)
      });
      const addedShoe = await response.json();
      setShoeList(prev => [...prev, addedShoe]);
      setFilteredShoes(prev => [...prev, addedShoe]);
      return addedShoe;
    } catch (error) {
      console.error("Error adding shoe:", error);
      throw error;
    }
  };

  const isAuthPage = ['/login', '/signup', '/reset-password'].includes(location.pathname);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <AuthProvider>
      {!isAuthPage && <NavBar cartCount={cart.length} />}
      
      <div style={{ padding: isAuthPage ? '0' : '20px' }}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          
          <Route path="/shoes" element={
        <ProtectedRoute>
        <>
          <ShoeCategory shoes={shoeList} setFilteredShoes={setFilteredShoes} />
          <ShoeList shoes={filteredShoes} onAddShoeToCart={handleAddToCart} />
        </>
        </ProtectedRoute>
        } />
  
          <Route path="/shoes" element={<ShoeCategory />} />
          <Route path="/shoes/:id" element={<ShoeDetail />} />
          <Route path="/shoedetail" element={<ShoeDetail />} />
          
          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          
          {/* Protected routes */}
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
          
          <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
          <AdminDashboard onAddShoe={addNewShoe} />
          </ProtectedRoute>
          } />
          
          <Route path="*" element={<ErrorPage errorMessage="Page not found" />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

function ProtectedRoute({ children, requireAuth = true, adminOnly = false }) {
  const { user, isLoading: authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (adminOnly && (!user || !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export default App;
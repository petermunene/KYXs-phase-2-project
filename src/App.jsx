import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from "./Context/AuthContext";
import { useAuth } from './Context/AuthContext';
/* import NavBar from './components/NavBar'; */
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import PasswordReset from "./components/Auth/PasswordReset";
import ShoeFilter from "./components/ShoeCategory";
import ShoeList from "./components/ShoesList";
import Cart from "./components/Cart";


function App() {
  const [shoeList, setShoeList] = useState([]);
  const [filteredShoes, setFilteredShoes] = useState([]);
  const [cart, setCart] = useState([]); 

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
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset-password" element={<PasswordReset />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>        
   </AuthProvider> 

    <ShoeFilter shoes={shoeList} setFilteredShoes={setFilteredShoes}/>
    <ShoeList shoes={filteredShoes}  />
    <Cart 
      cart={cart}
      onAddShoeToCart={handleAddToCart}
      onRemoveShoeFromCart={handleRemoveFromCart}
    />
  </div>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default App;

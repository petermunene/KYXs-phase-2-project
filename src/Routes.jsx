import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import PasswordReset from "./components/Auth/PasswordReset";
import Cart from "./components/Cart";
import ProtectedRoute from "./components/ProtectedRoute"; // Define your ProtectedRoute here

const Router = ({ cart, handleAddToCart, handleRemoveFromCart }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home onAddShoeToCart={handleAddToCart} />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset-password" element={<PasswordReset />} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart cart={cart} onRemoveShoeFromCart={handleRemoveFromCart} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Router;

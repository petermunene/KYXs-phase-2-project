import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:4000"
  : "https://my-app-backend-hvge.onrender.com/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // For regular users (localStorage)
  const loginWithLocalStorage = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]'); // Fixed default value
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const userData = {
      email: foundUser.email,
      isAdmin: false, // Regular users are never admins
      isLocalUser: true
    };

    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  // For admin users (API)
  const loginWithAPI = async (email, password) => {
    const response = await fetch(`${BASE_URL}/login?email=${email}&password=${password}`);
  
    if (!response.ok) {
      throw new Error('Network error while checking credentials');
    }
  
    const users = await response.json();
  
    if (users.length === 0) {
      throw new Error('Invalid admin credentials');
    }
  
    const user = users[0];
    const userData = {
      ...user,
      isAdmin: true,
      isLocalUser: false
    };
  
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };
  

  const login = async (email, password, isAdminLogin = false) => {
    try {
      setLoading(true);
      const userData = isAdminLogin 
        ? await loginWithAPI(email, password)
        : loginWithLocalStorage(email, password);
      
      setUser(userData);
      
      // Handle navigation here based on user type
      if (userData.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/shoes');
      }
      
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = (email, password) => {
    try {
      setLoading(true);
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      if (users.some(u => u.email === email)) {
        throw new Error('Email already exists');
      }

      users.push({ email, password });
      localStorage.setItem('users', JSON.stringify(users));
      
      const userData = {
        email,
        isAdmin: false,
        isLocalUser: true
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate('/');
    } catch (error) {
      throw error; // Re-throw the error to be caught by the caller
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      login, 
      signup,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
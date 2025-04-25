import { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const login = async (email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (email === "test@example.com" && password === "password") {
        setUser({ email });
        navigate('/');
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (userData.email && userData.password) {
        setUser({ email: userData.email });
        navigate('/');
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

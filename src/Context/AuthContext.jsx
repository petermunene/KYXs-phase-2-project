import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [usersDB, setUsersDB] = useState([]);

  // Load users from localStorage on initial render
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    const storedUser = localStorage.getItem('user');
    
    if (storedUsers) {
      setUsersDB(JSON.parse(storedUsers));
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userExists = usersDB.find(
        user => user.email === email && user.password === password
      );
      
      if (userExists) {
        setUser({ email: userExists.email });
        localStorage.setItem('user', JSON.stringify({ email: userExists.email }));
        return true;
      }
      throw new Error("Invalid credentials");
    } catch (error) {
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const emailExists = usersDB.some(user => user.email === userData.email);
      if (emailExists) {
        throw new Error("Email already exists");
      }

      const newUser = {
        email: userData.email,
        password: userData.password
      };

      const updatedUsers = [...usersDB, newUser];
      setUsersDB(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      return true; // Success, but don't log in
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
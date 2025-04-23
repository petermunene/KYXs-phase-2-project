import { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const login = async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    setUser({ email })
    navigate('/')
  }

  const signup = async (userData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    setUser({ email: userData.email })
    navigate('/')
  }

  const logout = () => {
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
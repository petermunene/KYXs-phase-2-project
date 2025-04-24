
import React ,{useState,useEffect} from "react";
import ShoeList from "./components/ShoesList";
import { useAuth } from './Context/AuthContext'; 
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from "./Context/AuthContext";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import PasswordReset from "./components/Auth/PasswordReset";
import ShoeFilter from "./components/ShoeCategory";


function App() {
  const [shoeList,setShoeList]=useState([])
  const [filteredShoes,setFilteredShoes]=useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/shoes")
    .then((res)=>res.json())
    .then((data)=>{
      setFilteredShoes(data)
      setShoeList(data)
    })
  },[])

  
  return (
   <div style={{gap:10,display:"flex",flexDirection:"column", justifyContent:"center",alignContent:"center"}}>
    <AuthProvider>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/reset-password" element={<PasswordReset />} />
      </Routes>
    </AuthProvider>
    <ShoeFilter shoes={shoeList} setFilteredShoes={setFilteredShoes}/>
    <ShoeList shoes={filteredShoes}  />
  </div>


  )


 }


function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

export default App

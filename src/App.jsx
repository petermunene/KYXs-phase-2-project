import React ,{useState,useEffect} from "react";
import ShoeList from "./components/ShoesList";

 function App(){
  const [shoeList,setShoeList]=useState([])
  const [filteredShoes,setFilteredShoes]=useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/shoes")
    .then((res)=>res.json())
    .then((data)=>{
      setFilteredShoes(data)
      setShoeList(data)
    })
  })

  return(
    <div>
      <ShoeList shoes={filteredShoes}  />
    </div>
  )

 }
 export default App
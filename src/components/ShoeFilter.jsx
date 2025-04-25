
import React from "react";


function ShoeFilter({shoes ,setFilteredShoes}){
    
        function handleFilter(input) {
            const updated = shoes.filter((shoe) => 
              shoe.price.toString().includes(input)||
              shoe.name.toLowerCase().includes(input.toLowerCase()) ||
              shoe.brand.toLowerCase().includes(input.toLowerCase())
              
            );
            setFilteredShoes(updated);
          }


    
    return(
        <div>
            <input type="text" placeholder="what  are you looking for..."onChange={(e)=>handleFilter(e.target.value)} style={{height:10,width:540,padding:10,borderRadius:40, fontSize:20, fontFamily:"sans-serif"}} />
        </div>
    )
}
export default ShoeFilter
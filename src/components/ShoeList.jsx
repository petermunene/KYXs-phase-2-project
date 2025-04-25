import React from "react";
import ShoeCard from "./ShoeCard";
function ShoeList({shoes,onAddShoeToCart}){
    return(
        <div style={{display:"flex", flexWrap:"wrap",justifyContent:'space-around',gap:5}}>
            {shoes.map((shoe)=>
            <ShoeCard key={shoe.id}  shoe={shoe} onAddShoeToCart={onAddShoeToCart} />)}
        </div>
    )


}
export default ShoeList
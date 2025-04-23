import React from "react";
import ShoeCard from "./ShoeCard";
function ShoeList({shoes}){
    return(
        <div style={{display:"flex", flexWrap:"wrap",justifyContent:'space-around',gap:10}}>
            {shoes.map((shoe)=>
            <ShoeCard key={shoe.id}  shoe={shoe}  />)}
        </div>
    )


}
export default ShoeList
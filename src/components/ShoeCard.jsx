import React from "react";
function ShoeCard({shoe}){

    return(
        <div  id="card"
        style={
            {display:"flex",
            flexDirection:'column',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            padding:10, backgroundColor:"white", 
            width:250,
            borderRadius:10,
            justifyContent:"space-between",
            
            
            }}>
            <img src={shoe.image} height={250}/>
            <h2>{shoe.name}</h2>
            <b>{shoe.brand}</b>
            <h3>Price: {shoe.price}</h3>
            <button id="button" style={{backgroundColor:"#644619", borderRadius:10, color:"White",padding:10}}>Add to cart</button>

        </div>
    )

}
export default ShoeCard
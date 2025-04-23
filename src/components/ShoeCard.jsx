import React from "react";
function ShoeCard({shoe}){

    return(
        <div style={{display:"flex",flexDirection:'column',padding:10, backgroundColor:"blue", width:250,border:"1px solid black",borderRadius:10,justifyContent:"space-between"}}>
            <img src={shoe.image} height={250}/>
            <h2>{shoe.name}</h2>
            <b>{shoe.brand}</b>
            <small>price: {shoe.price}</small>
            <button>Add to cart</button>

        </div>
    )

}
export default ShoeCard
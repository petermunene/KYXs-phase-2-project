import React from "react";
import ShoeCard from "./ShoeCard";


function Cart({ cart, onRemoveShoeFromCart }) {
    return (
      <div className="container">
        {cart.map(shoe => (
          <ShoeCard 
            key={shoe.id}
            shoe={shoe}
            onRemoveShoeFromCart={onRemoveShoeFromCart}
            
          />
        ))}
      </div>
    );
  }


export default Cart;

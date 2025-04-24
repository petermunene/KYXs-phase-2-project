import React from "react";
import ShoeCard from "./ShoeCard";

function Cart({ cart, onAddShoeToCart, onRemoveShoeFromCart }) {
    return (
        <div className="container">
            {cart.map(shoe => (
            <span key={shoe.id}>
                <ShoeCard 
                    onAddShoeToCart={onAddShoeToCart}
                    onRemoveShoeFromCart={onRemoveShoeFromCart} />
            </span>
            ))}
        </div>
    )
}

export default Cart;
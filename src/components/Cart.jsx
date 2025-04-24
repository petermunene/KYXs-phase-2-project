import React from "react";
import ShoeCard from "./ShoeCard";

function Cart({ cart }) {
    return (
        <div className="container">
            {cart.map(shoe => (
            <span key={shoe.id}>
                <ShoeCard />
            </span>
            ))}

        </div>
    )
}

export default Cart;
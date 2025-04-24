import React from "react";

function Cart({ cart }) {
    return (
        <div className="container">
            {cart.map(shoe => (
            <span key={shoe.id}>
                <ShoeCard 
                    onAddShoeToCart={handleAddToCart}
                    onRemoveShoeFromCart={handleRemoveFromCart} />
            </span>
            ))}
        </div>
    )
}

export default Cart;
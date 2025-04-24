import React from "react";
import ShoeCard from "./ShoeCard";

function Cart({ cart, onAddShoeToCart, onRemoveShoeFromCart }) {
  const total = cart.reduce((sum, shoe) => sum + shoe.price, 0);

  return (
    <div className="container p-6">
      <h1 className="text-2xl font-semibold text-[#5C4033] mb-4">Your Cart</h1>

      <div className="grid gap-4">
        {cart.map((shoe) => (
          <span key={shoe.id}>
            <ShoeCard
              shoe={shoe}
              onAddShoeToCart={onAddShoeToCart}
              onRemoveShoeFromCart={onRemoveShoeFromCart}
            />
          </span>
        ))}
      </div>

      <div className="mt-6 text-xl font-medium text-[#5C4033]">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
}

export default Cart;

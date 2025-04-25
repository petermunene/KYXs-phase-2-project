import React, { useState } from 'react';

function ShoeCard({ shoe, onAddShoeToCart, onRemoveShoeFromCart }) {
  const [showForm, setShowForm] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("pickup");

  const handleSubmit = (e) => {
    alert("submition succesful!")
    e.preventDefault();
    const order = {
      ...shoe,
      quantity,
      color,
      deliveryOption,
      totalPrice: shoe.price * quantity
    };

    fetch("http://localhost:4000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    }).then(() => {
      if (onAddShoeToCart) {
        onAddShoeToCart(order);
      }
      setShowForm(false);
    });
  };

  return (
    <div style={{ position: "relative", width: 350, margin: 20 }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        padding: 10,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "space-between"
      }}>
        <img src={shoe.image} alt={shoe.name} height={250} />
        <h2>{shoe.name}</h2>
        <b>{shoe.brand}</b>
        <h3>Price: ${shoe.price}{shoe.quantity && ` x ${shoe.quantity}`}</h3>

        {onAddShoeToCart ? (
          <button
            onClick={() => setShowForm(true)}
            style={{
              backgroundColor: "#644619",
              borderRadius: 10,
              color: "white",
              padding: 10
            }}
          >
            Add to cart
          </button>
        ) : (
          <>
            <button
              onClick={() => onRemoveShoeFromCart(shoe)}
              style={{
                backgroundColor: "red",
                borderRadius: 10,
                color: "white",
                padding: 10
              }}
            >
              Remove from Cart
            </button>
            <button
              onClick={() => alert("Successful Purchase!")}
              style={{
                backgroundColor: "green",
                borderRadius: 10,
                color: "white",
                padding: 10,
                marginLeft: 10
              }}
            >
              Buy
            </button>
          </>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          background: "#fff",
          width: "100%",
          padding: 20,
          borderRadius: 20,
          boxShadow: "0 0 15px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          gap: 10
        }}>
          <img src={shoe.image} alt={shoe.name} height={200} />
          <div>
            <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
            <span style={{ margin: "0 10px" }}>{quantity}</span>
            <button type="button" onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>
          <input
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Preferred Color"
          />
          <select
            value={deliveryOption}
            onChange={(e) => setDeliveryOption(e.target.value)}
          >
            <option value="pickup">Pick up</option>
            <option value="delivery">Delivery</option>
          </select>
          <p>Total: ${shoe.price * quantity}</p>
          <button type="submit">Submit Order</button>
          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default ShoeCard;
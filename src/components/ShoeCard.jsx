
import React, { useState } from 'react';

function ShoeCard({ shoe, onAddShoeToCart, onRemoveShoeFromCart, inCart = false }) {
  const [showForm, setShowForm] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("pickup");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const order = {
        ...shoe,
        quantity,
        color,
        deliveryOption,
        totalPrice: shoe.price * quantity
      };

      await onAddShoeToCart(order);
      
      setShowForm(false);
      setQuantity(1);
      setColor("");
      setDeliveryOption("pickup");
      

    } catch (error) {
      console.error("Purchase error:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  return (
    <div style={{ 
      position: "relative", 
      width: 350, 
      margin: 20,
      transition: 'transform 0.5s ease'
    }}>
      <div
        className="shoe-card"
        style={{
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          padding: "10px",
          backgroundColor: "white",
          borderRadius: "10px",
          justifyContent: "space-between",
          height: "100%"
        }}
      >
        <img 
          src={shoe.image} 
          alt={shoe.name} 
          style={{ 
            height: "250px", 
            objectFit: "cover",
            borderRadius: "8px" 
          }} 
        />
        <h2 style={{ margin: "10px 0" }}>{shoe.name}</h2>
        <b style={{ color: "#666" }}>{shoe.brand}</b>
        <h3 style={{ color: "#885a04", margin: "10px 0" }}>
          Price: ${shoe.price}
        </h3>

        {!inCart ? (
          <button
            onClick={() => setShowForm(true)}
            style={{
              backgroundColor: "#644619",
              borderRadius: "10px",
              color: "white",
              padding: "10px",
              border: "none",
              cursor: "pointer",
              transition: "transform 0.3s ease"
            }}
          >
            Add to cart
          </button>
        ) : (
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => onRemoveShoeFromCart(shoe.id)}
              style={{
                backgroundColor: "#dc3545",
                borderRadius: "10px",
                color: "white",
                padding: "10px",
                border: "none",
                cursor: "pointer",
                flex: 1
              }}
            >
              Remove
            </button>
            <button
              onClick={() => alert("Purchase Successful!")}
              style={{
                backgroundColor: "#28a745",
                borderRadius: "10px",
                color: "white",
                padding: "10px",
                border: "none",
                cursor: "pointer",
                flex: 1
              }}
            >
              Buy Now
            </button>
          </div>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 15px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}
        >
          <img 
            src={shoe.image} 
            alt={shoe.name} 
            style={{ 
              height: "200px", 
              objectFit: "cover",
              borderRadius: "8px" 
            }} 
          />
          
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button 
              type="button" 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              style={{
                padding: "5px 10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                cursor: "pointer"
              }}
            >
              -
            </button>
            <span style={{ margin: "0 10px" }}>{quantity}</span>
            <button 
              type="button" 
              onClick={() => setQuantity(q => q + 1)}
              style={{
                padding: "5px 10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                cursor: "pointer"
              }}
            >
              +
            </button>
          </div>

          <input
            required
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Preferred Color"
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ddd"
            }}
          />

          <select
            value={deliveryOption}
            onChange={(e) => setDeliveryOption(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ddd"
            }}
          >
            <option value="pickup">Pick up</option>
            <option value="delivery">Delivery</option>
          </select>

          <p style={{ fontWeight: "bold", color: "#333" }}>
            Total: ${(shoe.price * quantity).toFixed(2)}
          </p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#644619",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                flex: 1
              }}
            >
              Confirm Order
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                backgroundColor: "#6c757d",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                flex: 1
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ShoeCard;
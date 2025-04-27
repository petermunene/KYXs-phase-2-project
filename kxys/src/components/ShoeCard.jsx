import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ShoeCard({ shoe, onAddShoeToCart, onRemoveShoeFromCart }) {
  const [showForm, setShowForm] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("pickup");
  const navigate = useNavigate();

  // Available color options
  const colorOptions = shoe.availableColors || [
    "Black", "White", "Red", "Blue", "Green",
    "Yellow", "Brown", "Gray", "Pink", "Purple"
  ];

  const handleCardClick = () => {
    navigate(`/shoes/${shoe.id}`, { state: { shoe } });
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      ...shoe,
      quantity,
      color,
      deliveryOption,
      totalPrice: shoe.price * quantity,
      inStock: shoe.inStock 
    };

      if (onAddShoeToCart) {
        onAddShoeToCart(order);
      }
      setShowForm(false);
  };

  return (
    <div style={{ position: "relative", width: 350, margin: 20 }}>

      <div 
        style={{
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          padding: 20,
          backgroundColor: "white",
          borderRadius: 10,
          justifyContent: "space-between",
          height: "100%",
          cursor: "pointer",
          transition: "transform 0.3s ease",
          ":hover": {
            transform: "scale(1.02)"
          }
        }}
        onClick={handleCardClick}
      >
        <img 
          src={shoe.image} 
          alt={shoe.name} 
          style={{ 
            height: 250, 
            width: "100%", 
            objectFit: "cover",
            borderRadius: 5
          }} 
        />
        <div style={{ marginTop: 15 }}>
          <h2 style={{ margin: "5px 0", fontSize: 20 }}>{shoe.name}</h2>
          <p style={{ margin: "5px 0", color: "#555" }}>{shoe.brand}</p>
          <p style={{ margin: "5px 0", fontWeight: "bold", fontSize: 18 }}>
            ${shoe.price}
          </p>
          <div style={{ 
            display: "inline-block",
            padding: "3px 8px",
            backgroundColor: shoe.inStock ? "#e6f7ee" : "#ffebee",
            color: shoe.inStock ? "#2e7d32" : "#c62828",
            borderRadius: 4,
            fontWeight: "bold",
            fontSize: 14,
            margin: "5px 0"
          }}>
            {shoe.inStock ? "In Stock" : "Out of Stock"}
          </div>
        </div>

    
        {onAddShoeToCart ? (
          shoe.inStock && (
            <button
              onClick={handleAddToCartClick}
              style={{
                backgroundColor: "#644619",
                borderRadius: 5,
                color: "white",
                padding: "10px 0",
                width: "100%",
                border: "none",
                marginTop: 15,
                cursor: "pointer",
                fontSize: 16,
                transition: "background-color 0.3s",
                ":hover": {
                  backgroundColor: "#8d6e63"
                }
              }}
            >
              Add to Cart
            </button>
          )
        ) : (
          <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveShoeFromCart(shoe.id, shoe.color);
              }}
              style={{
                backgroundColor: "#644619",
                borderRadius: 5,
                color: "white",
                padding: 10,
                border: "none",
                flex: 1,
                cursor: "pointer",
                fontSize: 16
              }}
            >
              Remove
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                alert("Purchase Successful!");
              }}
              style={{
                backgroundColor: "#644619",
                borderRadius: 5,
                color: "white",
                padding: 10,
                border: "none",
                flex: 1,
                cursor: "pointer",
                fontSize: 16
              }}
            >
              Buy Now
            </button>
          </div>
        )}
      </div>

      
      {showForm && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <form onSubmit={handleSubmit} style={{
            backgroundColor: "white",
            padding: 25,
            borderRadius: 10,
            width: "90%",
            maxWidth: 400,
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
          }}>
            <h2 style={{ marginTop: 0 }}>Add to Cart</h2>
            
            <img 
              src={shoe.image} 
              alt={shoe.name} 
              style={{ 
                width: "100%", 
                height: 200, 
                objectFit: "contain",
                margin: "10px 0"
              }} 
            />
            
            <div style={{ margin: "15px 0" }}>
              <label style={{ display: "block", marginBottom: 5 }}>Quantity:</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button 
                  type="button" 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#f5f5f5",
                    border: "1px solid #ddd",
                    cursor: "pointer"
                  }}
                >
                  -
                </button>
                <span style={{ 
                  padding: "5px 15px",
                  borderTop: "1px solid #ddd",
                  borderBottom: "1px solid #ddd"
                }}>
                  {quantity}
                </span>
                <button 
                  type="button" 
                  onClick={() => setQuantity(q => q + 1)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#f5f5f5",
                    border: "1px solid #ddd",
                    cursor: "pointer"
                  }}
                >
                  +
                </button>
              </div>
            </div>
            
            <div style={{ margin: "15px 0" }}>
              <label htmlFor="color" style={{ display: "block", marginBottom: 5 }}>
                Color:
              </label>
              <select
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 4,
                  border: "1px solid #ddd"
                }}
              >
                <option value="">Select a color</option>
                {colorOptions.map((colorOption) => (
                  <option key={colorOption} value={colorOption}>
                    {colorOption}
                  </option>
                ))}
              </select>
            </div>
            
            <div style={{ margin: "15px 0" }}>
              <label htmlFor="delivery" style={{ display: "block", marginBottom: 5 }}>
                Delivery Option:
              </label>
              <select
                id="delivery"
                value={deliveryOption}
                onChange={(e) => setDeliveryOption(e.target.value)}
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 4,
                  border: "1px solid #ddd"
                }}
              >
                <option value="pickup">Pick up</option>
                <option value="delivery">Delivery</option>
              </select>
            </div>
            
            <p style={{ fontSize: 18, fontWeight: "bold" }}>
              Total: ${(shoe.price * quantity).toFixed(2)}
            </p>
            
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: 10,
                  backgroundColor: "#644619",
                  color: "white",
                  border: "none",
                  borderRadius: 5,
                  cursor: "pointer",
                  fontSize: 16
                }}
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  flex: 1,
                  padding: 10,
                  backgroundColor: "#f5f5f5",
                  color: "#333",
                  border: "1px solid #ddd",
                  borderRadius: 5,
                  cursor: "pointer",
                  fontSize: 16
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ShoeCard;
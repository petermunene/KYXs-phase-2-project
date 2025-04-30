import React from "react";
import { useNavigate } from "react-router-dom";
import ShoeCard from "./ShoeCard";

const Cart = ({ cart, onRemoveShoeFromCart, onUpdateQuantity, onClearCart, isClearingCart }) => {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleQuantityChange = (shoeId, color, newQuantity) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(shoeId, color, newQuantity);
    }
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout!");
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Shopping Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})</h2>
      
      {cart.length === 0 ? (
        <div style={styles.emptyCart}>
          <p style={styles.emptyText}>Your cart is empty</p>
          <button 
            style={styles.continueButton}
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div style={styles.itemsContainer}>
            {cart.map(item => (
              <div key={`${item.id}-${item.color}`} style={styles.cartItem}>
                <div style={styles.itemImageContainer}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={styles.itemImage}
                  />
                </div>
                
                <div style={styles.itemDetails}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <p style={styles.itemBrand}>{item.brand}</p>
                  <p style={styles.itemColor}>Color: {item.color}</p>
                  
                  <div style={styles.quantityControls}>
                    <button 
                      style={styles.quantityButton}
                      onClick={() => handleQuantityChange(item.id, item.color, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span style={styles.quantityDisplay}>{item.quantity}</span>
                    <button 
                      style={styles.quantityButton}
                      onClick={() => handleQuantityChange(item.id, item.color, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    style={styles.removeButton}
                    onClick={() => onRemoveShoeFromCart(item.id, item.color)}
                  >
                    Remove
                  </button>
                </div>
                
                <div style={styles.itemPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div style={styles.summary}>
            <div style={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div style={styles.totalRow}>
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            
            <div style={styles.actionButtons}>
              <button 
                style={styles.clearButton}
                onClick={onClearCart}
                disabled={isClearingCart}
              >
                {isClearingCart ? 'Clearing...' : 'Clear Cart'}
              </button>
              <button 
                style={styles.checkoutButton}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '0 2rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#333',
    fontWeight: '600',
  },
  emptyCart: {
    textAlign: 'center',
    padding: '4rem 0',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  },
  emptyText: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '1.5rem',
  },
  continueButton: {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#644619',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginBottom: '3rem',
  },
  cartItem: {
    display: 'grid',
    gridTemplateColumns: '150px 1fr auto',
    gap: '2rem',
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    alignItems: 'center',
  },
  itemImageContainer: {
    width: '150px',
    height: '150px',
    overflow: 'hidden',
    borderRadius: '4px',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  itemName: {
    fontSize: '1.2rem',
    margin: '0',
    fontWeight: '600',
  },
  itemBrand: {
    color: '#666',
    margin: '0',
  },
  itemColor: {
    color: '#444',
    margin: '0',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    marginTop: '0.5rem',
  },
  quantityButton: {
    width: '32px',
    height: '32px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityDisplay: {
    minWidth: '30px',
    textAlign: 'center',
  },
  removeButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#644619',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
    width: 'fit-content',
  },
  itemPrice: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#333',
  },
  summary: {
    backgroundColor: '#f9f9f9',
    padding: '1.5rem 2rem',
    borderRadius: '8px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    fontSize: '1.1rem',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.3rem',
    fontWeight: '600',
    borderTop: '1px solid #ddd',
    paddingTop: '1rem',
    marginTop: '1rem',
  },
  actionButtons: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
  },
  clearButton: {
    flex: 1,
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    color: '#333',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: '500',
  },
  checkoutButton: {
    flex: 1,
    padding: '1rem',
    backgroundColor: '#644619',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: '500',
  },
};

export default Cart;
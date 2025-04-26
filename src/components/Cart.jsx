import React from "react";
import { useNavigate } from "react-router-dom";
import ShoeCard from "./ShoeCard";

function Cart({ cart, onRemoveShoeFromCart, onUpdateQuantity, onClearCart }) {
  const navigate = useNavigate();

  // Calculate cart total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Handle quantity changes
  const handleQuantityChange = (shoeId, newQuantity) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(shoeId, newQuantity);
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    alert("Proceeding to checkout!");
    // Add your checkout logic here
  };

  // Handle continue shopping
  const handleContinueShopping = () => {
    navigate("/");
  };

  // Styles object
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '2rem auto',
      padding: '0 1rem'
    },
    title: {
      fontSize: '1.8rem',
      marginBottom: '1.5rem',
      color: '#333'
    },
    emptyCart: {
      textAlign: 'center',
      padding: '3rem 0'
    },
    emptyText: {
      fontSize: '1.2rem',
      color: '#666'
    },
    continueButton: {
      padding: '0.8rem 1.5rem',
      backgroundColor: '#644619',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      marginTop: '1rem',
      cursor: 'pointer',
      fontSize: '1rem'
    },
    itemsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    cartItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
      padding: '1rem',
      border: '1px solid #eee',
      borderRadius: '8px',
      position: 'relative'
    },
    quantityControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginLeft: '1rem'
    },
    quantityButton: {
      width: '30px',
      height: '30px',
      border: '1px solid #ddd',
      backgroundColor: 'white',
      cursor: 'pointer',
      borderRadius: '4px',
      fontSize: '1rem',
      ':hover': {
        backgroundColor: '#f5f5f5'
      }
    },
    quantityDisplay: {
      minWidth: '30px',
      textAlign: 'center'
    },
    itemSubtotal: {
      marginLeft: 'auto',
      fontWeight: 'bold',
      fontSize: '1.1rem'
    },
    summary: {
      backgroundColor: '#f9f9f9',
      padding: '1.5rem',
      borderRadius: '8px',
      marginTop: '2rem'
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      fontSize: '1.1rem'
    },
    totalRow: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      borderTop: '1px solid #ddd',
      paddingTop: '1rem'
    },
    actionButtons: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem'
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
      fontWeight: 'bold'
    },
    clearButton: {
      flex: 1,
      padding: '1rem',
      backgroundColor: '#644619',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer',
      fontWeight: 'bold'
    }
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
            {cart.map(shoe => (
              <div key={`${shoe.id}-${shoe.color}`} style={styles.cartItem}>
                <ShoeCard 
                  shoe={shoe}
                  onRemoveShoeFromCart={onRemoveShoeFromCart}
                />
                <div style={styles.quantityControls}>
                  <button 
                    style={styles.quantityButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuantityChange(shoe.id, shoe.quantity - 1);
                    }}
                    disabled={shoe.quantity <= 1}
                  >
                    −
                  </button>
                  <span style={styles.quantityDisplay}>{shoe.quantity}</span>
                  <button 
                    style={styles.quantityButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuantityChange(shoe.id, shoe.quantity + 1);
                    }}
                  >
                    +
                  </button>
                </div>
                <div style={styles.itemSubtotal}>
                  ${(shoe.price * shoe.quantity).toFixed(2)}
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
            <div style={{ ...styles.summaryRow, ...styles.totalRow }}>
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div style={styles.actionButtons}>
              <button 
                style={styles.clearButton}
                onClick={onClearCart}
              >
                Clear Cart
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
}

export default Cart;
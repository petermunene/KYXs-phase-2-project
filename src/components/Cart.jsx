// src/components/Cart.jsx

import React from 'react';

function Cart({ cart, removeFromCart }) {
  return (
    <div style={styles.cartContainer}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul style={styles.cartList}>
          {cart.map((shoe) => (
            <li key={shoe.id} style={styles.cartItem}>
              <p>{shoe.name}</p>
              <button onClick={() => removeFromCart(shoe.id)} style={styles.removeButton}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  cartContainer: {
    padding: '20px',
  },
  cartList: {
    listStyle: 'none',
    padding: 0,
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #ccc',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default Cart;

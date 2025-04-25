import { useEffect, useState } from 'react';
import ShoeCard from './ShoeCard';

function Cart({ cart, onRemoveShoeFromCart }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="container p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      <div className="grid gap-4">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <ShoeCard shoe={item} inCart={true} onRemoveShoeFromCart={onRemoveShoeFromCart}  />
            
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default Cart;
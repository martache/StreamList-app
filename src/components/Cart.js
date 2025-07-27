
import React, { useEffect, useState, useCallback } from 'react';
import '../App.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = useCallback(() => {
    const newItem = {
      id: Date.now(),
      name: 'Sample Item',
      price: 9.99,
      quantity: 1
    };
    setCartItems([...cartItems, newItem]);
  }, [cartItems]);

  const removeItemFromCart = useCallback((id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  }, [cartItems]);

  return (
    <div className="page-container">
      <h1>Cart Page</h1>
      <button onClick={addItemToCart}>Add Sample Item</button>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)}
              <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
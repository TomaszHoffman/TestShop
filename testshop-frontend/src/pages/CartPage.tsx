import React from 'react';
import '../styles/CartPage.css';

const CartPage: React.FC = () => {
  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-empty">
        <p>Your cart is empty</p>
        <p>Add some products to your cart to see them here!</p>
      </div>
    </div>
  );
};

export default CartPage;
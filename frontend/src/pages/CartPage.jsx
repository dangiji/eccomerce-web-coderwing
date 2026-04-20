import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, removeFromCart } from '../services/api';
import './CartPage.css';

function CartPage() {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return navigate('/login');
      }

      try {
        const response = await getCart();
        setCart(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, [navigate]);

  const handleRemove = async (productId) => {
    try {
      const response = await removeFromCart(productId);
      setCart(response.data.cart || { items: [], totalPrice: 0 });
    } catch (error) {
      console.error(error);
      alert('Unable to remove item from cart');
    }
  };

  const subtotal = Number(cart.totalPrice) || 0;
  const shipping = subtotal > 0 ? 9.99 : 0;
  const total = subtotal + shipping;

  return (
    <main className="cart-page">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        <p>Review your items and proceed to checkout.</p>
      </div>

      {loading ? (
        <p>Loading cart...</p>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.items.length === 0 ? (
              <div className="empty-cart">
                <p>No items in your cart yet.</p>
                <Link to="/products" className="btn-primary">
                  Shop Products
                </Link>
              </div>
            ) : (
              cart.items.map((item) => (
                <div key={item.productId} className="cart-item-card">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p className="price">${Number(item.price).toFixed(2)}</p>
                    <button className="btn-secondary" onClick={() => handleRemove(item.productId)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn-primary checkout-button">
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}

export default CartPage;

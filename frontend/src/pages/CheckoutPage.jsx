import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, createOrder, clearCart } from '../services/api';
import './CheckoutPage.css';

function CheckoutPage() {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'Credit Card',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return navigate('/login');
    }

    const loadCart = async () => {
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (cart.items.length === 0) {
      return alert('Your cart is empty. Add items before checkout.');
    }

    setSubmitting(true);

    try {
      await createOrder({
        items: cart.items,
        shippingInfo: {
          name: form.name,
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
          country: form.country,
        },
        paymentMethod: form.paymentMethod,
        totalAmount: cart.totalPrice,
      });

      await clearCart();
      alert('Order placed successfully!');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Unable to complete checkout.');
    } finally {
      setSubmitting(false);
    }
  };

  const subtotal = Number(cart.totalPrice) || 0;
  const shipping = subtotal > 0 ? 9.99 : 0;
  const total = subtotal + shipping;

  return (
    <main className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your order with shipping and payment details.</p>
      </div>

      {loading ? (
        <p>Loading checkout details...</p>
      ) : (
        <div className="checkout-layout">
          <section className="checkout-form-section">
            <h2>Shipping Information</h2>
            <form className="checkout-form" onSubmit={handleSubmit}>
              <label>
                Full Name
                <input name="name" value={form.name} onChange={handleChange} required />
              </label>
              <label>
                Address
                <input name="address" value={form.address} onChange={handleChange} required />
              </label>
              <label>
                City
                <input name="city" value={form.city} onChange={handleChange} required />
              </label>
              <label>
                Postal Code
                <input name="postalCode" value={form.postalCode} onChange={handleChange} required />
              </label>
              <label>
                Country
                <input name="country" value={form.country} onChange={handleChange} required />
              </label>
              <label>
                Payment Method
                <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                  <option>PayPal</option>
                </select>
              </label>
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </section>

          <aside className="checkout-summary">
            <h2>Order Summary</h2>
            {cart.items.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              <>
                <div className="summary-list">
                  {cart.items.map((item) => (
                    <div key={item.productId} className="summary-item">
                      <span>{item.name} ×{item.quantity}</span>
                      <span>${Number(item.total).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
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
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}

export default CheckoutPage;

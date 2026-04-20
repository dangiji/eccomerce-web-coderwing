import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, addToCart } from '../services/api';
import { getWishlistIds, removeFromWishlist } from '../utils/wishlist';
import './WishlistPage.css';

function WishlistPage() {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWishlist = async () => {
      const ids = getWishlistIds();
      setWishlistIds(ids);

      try {
        const response = await getProducts();
        const wishlistItems = response.data.filter((product) => ids.includes(product.id));
        setWishlistProducts(wishlistItems);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, []);

  const handleRemove = (productId) => {
    const updatedIds = removeFromWishlist(productId);
    setWishlistIds(updatedIds);
    setWishlistProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return navigate('/login');
    }

    try {
      await addToCart(productId, 1);
      alert('Item added to cart');
      handleRemove(productId);
    } catch (error) {
      console.error(error);
      alert('Unable to add item to cart');
    }
  };

  return (
    <main className="wishlist-page">
      <div className="page-header">
        <h1>My Wishlist</h1>
        <p>Save items for later and move them to your cart when ready.</p>
      </div>

      {loading ? (
        <p>Loading wishlist...</p>
      ) : wishlistProducts.length === 0 ? (
        <div className="empty-wishlist">
          <p>Your wishlist is empty.</p>
          <Link to="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistProducts.map((product) => (
            <div key={product.id} className="wishlist-card">
              <img src={product.image} alt={product.name} />
              <div className="wishlist-details">
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
                <div className="wishlist-actions">
                  <button className="btn-secondary" onClick={() => handleAddToCart(product.id)}>
                    Add to Cart
                  </button>
                  <button className="btn-danger" onClick={() => handleRemove(product.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default WishlistPage;

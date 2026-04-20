import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { getProducts, addToCart } from '../services/api';
import { addToWishlist } from '../utils/wishlist';
import './HomePage.css';

const categories = ['Electronics', 'Fashion', 'Home', 'Accessories', 'Audio'];

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return navigate('/login');
    }

    try {
      await addToCart(productId, 1);
      alert('Product added to cart');
    } catch (error) {
      console.error(error);
      alert('Unable to add product to cart');
    }
  };

  const handleAddToWishlist = (productId) => {
    const added = addToWishlist(productId);
    alert(added ? 'Added to wishlist' : 'This item is already in your wishlist');
  };

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-badge">Exclusive Offer</p>
          <h1>Up to 10% off on your first order</h1>
          <p>Find top-rated products across gaming, fashion, electronics, and more.</p>
          <Link to="/products" className="btn-primary hero-button">
            Shop Now
          </Link>
        </div>
        <div className="hero-image">
          <img
            src="https://via.placeholder.com/560x420?text=Featured+Product"
            alt="Featured product"
          />
        </div>
      </section>

      <section className="categories-section">
        <h2>Browse by Category</h2>
        <div className="categories-grid">
          {categories.map((item) => (
            <div key={item} className="category-card">
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="products-section">
        <div className="section-header">
          <div>
            <p className="section-subtitle">Best Selling</p>
            <h2>Top Products</h2>
          </div>
          <Link to="/products" className="view-all-link">
            View all products
          </Link>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="products-grid">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            ))}
          </div>
        )}
      </section>

      <section className="promo-banner">
        <div>
          <h2>Enhance Your Music Experience</h2>
          <p>Discover premium audio devices with unbeatable performance.</p>
        </div>
        <button className="btn-primary">Explore Now</button>
      </section>
    </main>
  );
}

export default HomePage;

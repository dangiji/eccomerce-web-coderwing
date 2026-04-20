import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { getProducts, addToCart } from '../services/api';
import { addToWishlist } from '../utils/wishlist';
import './ProductsPage.css';

function ProductsPage() {
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
    console.log('handleAddToWishlist called with:', productId);
    const added = addToWishlist(productId);
    alert(added ? 'Added to wishlist' : 'This item is already in your wishlist');
  };

  return (
    <main className="products-page">
      <section className="products-header">
        <div>
          <p className="section-subtitle">All Products</p>
          <h1>Find the perfect item for your needs</h1>
          <p>Browse our curated collection across electronics, fashion, and lifestyle.</p>
        </div>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </section>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="products-list-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default ProductsPage;

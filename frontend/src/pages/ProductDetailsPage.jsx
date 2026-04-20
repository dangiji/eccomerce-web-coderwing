import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, addToCart } from '../services/api';
import { addToWishlist } from '../utils/wishlist';
import './ProductDetailsPage.css';

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return navigate('/login');
    }
    try {
      await addToCart(id, 1);
      alert('Added to cart');
    } catch (error) {
      console.error(error);
      alert('Failed to add to cart');
    }
  };

  const handleAddToWishlist = () => {
    const added = addToWishlist(id);
    alert(added ? 'Added to wishlist' : 'Already in wishlist');
  };

  if (loading) {
    return <div className="product-details-page">Loading...</div>;
  }

  if (!product) {
    return <div className="product-details-page">Product not found.</div>;
  }

  return (
    <main className="product-details-page">
      <div className="details-card">
        <img src={product.image} alt={product.name} />
        <div className="details-content">
          <h1>{product.name}</h1>
          <p className="product-category">{product.category}</p>
          <p className="price">${product.price}</p>
          <p>{product.description}</p>
          <button className="btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="btn-secondary" onClick={handleAddToWishlist}>
            Add to Wishlist
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetailsPage;

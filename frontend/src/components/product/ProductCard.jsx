import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product, onAddToCart, onAddToWishlist }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="price">${product.price}</p>
        <div className="product-card-actions">
          <Link to={`/product/${product.id}`} className="detail-link">
            View Details
          </Link>
          <button className="btn-primary" onClick={() => onAddToCart?.(product.id)}>
            Add to Cart
          </button>
          {onAddToWishlist && (
            <button className="btn-secondary" onClick={() => onAddToWishlist(product.id)}>
              Add to Wishlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

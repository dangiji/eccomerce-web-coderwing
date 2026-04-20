import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAuth(Boolean(localStorage.getItem('token')));
  }, [location]);

  return (
    <header className="header">
      <div className="container">
        <div className="header-top">
          <Link to="/" className="logo">CoderWing</Link>
          <div className="search-bar">
            <input type="text" placeholder="Search products..." />
            <button>Search</button>
          </div>
          <div className="header-links">
            {isAuth ? (
              <>
                <Link to="/account" className="header-link">Account</Link>
                <Link to="/logout" className="header-link">Logout</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="header-link">Login</Link>
                <Link to="/signup" className="header-link">Register</Link>
              </>
            )}
            <Link to="/wishlist" className="header-link">
              <span>❤️</span> Wishlist
            </Link>
            <Link to="/cart" className="cart-link">
              <span>🛒</span> Cart
            </Link>
          </div>
        </div>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;

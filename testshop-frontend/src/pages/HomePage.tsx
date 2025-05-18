import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="hero">
        <div className="hero-content">
          <h2>Welcome to TestShop</h2>
          <p>Discover our amazing products at great prices</p>
          <Link to="/products" className="cta-button">
            Shop Now
          </Link>
        </div>
      </div>
      <div className="featured-section">
        <h3>Featured Categories</h3>
        <div className="categories">
          <div className="category">
            <div className="category-image-placeholder">Electronics</div>
            <Link to="/products">Electronics</Link>
          </div>
          <div className="category">
            <div className="category-image-placeholder">Clothing</div>
            <Link to="/products">Clothing</Link>
          </div>
          <div className="category">
            <div className="category-image-placeholder">Home & Kitchen</div>
            <Link to="/products">Home & Kitchen</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
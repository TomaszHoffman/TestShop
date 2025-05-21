import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import { api } from '../services/api';
import '../styles/ProductList.css';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchProducts = async () => {

      try {
        const data = await api.getProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {

        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="product-list">
      <h2>Our Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price}</p>
            <p className="product-stock">In stock: {product.stock}</p>
            <div className="product-actions">
              <Link to={`/products/${product.id}`} className="btn-details">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
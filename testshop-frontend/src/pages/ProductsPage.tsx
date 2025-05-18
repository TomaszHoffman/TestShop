import React from 'react';
import ProductList from '../components/ProductList';

const ProductsPage: React.FC = () => {
  console.log('ProductsPage component rendering');
  console.log('Imported ProductList:', ProductList);
  return (
    <div className="products-page">
      <ProductList />
    </div>
  );
};

export default ProductsPage;
import React, { useState, useEffect } from 'react';
import CreateProductForm from './CreateProductForm';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error:', err));
  }, []);

  const handleProductCreated = () => {
    fetch('http://127.0.0.1:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error:', err));
  };

  const handleDeleteProduct = (id) => {
    fetch(`http://127.0.0.1:5000/api/products/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((err) => console.error('Error:', err));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-orange">Product List</h2>
      <CreateProductForm onProductCreated={handleProductCreated} />

      <ul className="list-group mt-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-3 rounded"
            style={{ backgroundColor: '#f9f9f9' }}
          >
            <div className="product-info">
              <span className="font-weight-bold">{product.name}</span> -{' '}
              <strong>${product.price}</strong> (Stock: {product.stock})
            </div>
            <button
              className="btn btn-skyblue btn-sm"
              onClick={() => handleDeleteProduct(product.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
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

  const handleProductCreated = (newProductId) => {
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
        // Optionally, refresh the product list
        setProducts(products.filter(product => product.id !== id));
      })
      .catch((err) => console.error('Error:', err));
  };
  
  return (
    <div>
      <h2>Product List</h2>
  
      <CreateProductForm />
      
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price} (Stock: {product.stock})
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
  
  return (
    <div>
      <h2>Product List</h2>
      <CreateProductForm onProductCreated={handleProductCreated} />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price} (Stock: {product.stock})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
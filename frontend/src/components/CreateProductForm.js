import React, { useState } from 'react';

function CreateProductForm({ onProductCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);  // Reset any previous errors

    fetch('http://127.0.0.1:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to create product');
        }
        return res.json();
      })
      .then((data) => {
        alert(data.message);  // Display success message
        if (onProductCreated) onProductCreated(data.id);
        setLoading(false);  // Reset loading state
        setFormData({ name: '', price: '', stock: '' });  // Reset form
      })
      .catch((err) => {
        console.error('Error:', err);
        setLoading(false);  // Reset loading state
        setError('There was an issue creating the product. Please try again.');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          className="form-control"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
        />
      </div>
      <div className="form-group">
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          id="stock"
          name="stock"
          className="form-control"
          value={formData.stock}
          onChange={handleChange}
          required
          min="0"
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button type="submit" className="btn btn-skyblue" disabled={loading}>
        {loading ? 'Adding Product...' : 'Add Product'}
      </button>
    </form>
  );
}

export default CreateProductForm;
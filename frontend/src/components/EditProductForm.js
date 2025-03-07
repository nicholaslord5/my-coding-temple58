import React, { useState, useEffect } from 'react';

function EditProductForm({ productId, onProductUpdated }) {
  const [formData, setFormData] = useState({ name: '', price: '', stock: '' });

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error('Error:', err));
  }, [productId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:5000/api/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        onProductUpdated();
      })
      .catch((err) => console.error('Error:', err));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label htmlFor="name">Product Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="stock">Stock</label>
        <input
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
          required
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-skyblue">Update Product</button>
    </form>
  );
}

export default EditProductForm;
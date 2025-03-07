import React, { useState } from 'react';

function CustomerForm({ onCustomerCreated }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    fetch('http://127.0.0.1:5000/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        if (onCustomerCreated) onCustomerCreated(data.id);
        setFormData({ name: '', email: '', phone: '' });
      })
      .catch((err) => {
        console.error('Error:', err);
        setError('Failed to create customer');
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow border-0 bg-light">
      <h2 className="text-orange">Add Customer</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="mb-3">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-skyblue w-100" disabled={loading}>
        {loading ? 'Adding...' : 'Add Customer'}
      </button>
    </form>
  );
}

export default CustomerForm;

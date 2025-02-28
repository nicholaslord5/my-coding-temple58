import React, { useState } from 'react';

function CustomerForm({ onCustomerCreated }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Error state for better error handling

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
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        if (onCustomerCreated) onCustomerCreated(data.id);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setError('Failed to create customer');
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
        required
      />
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      <button type="submit" disabled={loading}>  {/* Disable the button while loading */}
        {loading ? 'Submitting...' : 'Add Customer'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message */}
    </form>
  );
}

export default CustomerForm;
import React, { useState, useEffect } from 'react';

function CustomerUpdateForm({ customerId, onCustomerUpdated }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    if (customerId) {
      fetch(`http://127.0.0.1:5000/api/customers/${customerId}`)
        .then(res => res.json())
        .then(data => setFormData({ name: data.name, email: data.email, phone: data.phone }))
        .catch(err => console.error('Error fetching customer details:', err));
    }
  }, [customerId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:5000/api/customers/${customerId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        if (onCustomerUpdated) onCustomerUpdated(data);
      })
      .catch(err => console.error('Error:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
      <button type="submit">Update Customer</button>
    </form>
  );
}

export default CustomerUpdateForm;
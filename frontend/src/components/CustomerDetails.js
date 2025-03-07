import React, { useState, useEffect } from 'react';

function CustomerDetails({ customerId }) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!customerId) return;

    fetch(`http://127.0.0.1:5000/api/customers/${customerId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch customer details');
        }
        return res.json();
      })
      .then((data) => {
        setCustomer(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setError('Could not load customer details.');
        setLoading(false);
      });
  }, [customerId]);

  if (loading) return <p className="text-info">Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!customer) return null;

  return (
    <div className="card p-3 mt-3 shadow border-0" style={{ backgroundColor: '#f4f4f4' }}>
      <h2 className="text-maroon">Customer Details</h2>
      <p><strong>ID:</strong> {customer.id}</p>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
    </div>
  );
}

export default CustomerDetails;
import React, { useState, useEffect } from 'react';

function CustomerDetails({ customerId, onCustomerDeleted }) {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/customers/${customerId}`)
      .then(res => res.json())
      .then(data => setCustomer(data))
      .catch(err => console.error('Error:', err));
  }, [customerId]);

  const handleDelete = () => {
    fetch(`http://127.0.0.1:5000/api/customers/${customerId}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        if (onCustomerDeleted) onCustomerDeleted();  // Notify parent that the customer was deleted
      })
      .catch(err => {
        console.error('Error:', err);
        alert('Failed to delete customer');
      });
  };

  if (!customer) return <p>Loading...</p>;

  return (
    <div>
      <h2>Customer Details</h2>
      <p>ID: {customer.id}</p>
      <p>Name: {customer.name}</p>
      <p>Email: {customer.email}</p>
      <p>Phone: {customer.phone}</p>
      <button onClick={handleDelete}>Delete Customer</button>
    </div>
  );
}

export default CustomerDetails;
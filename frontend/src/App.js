import React, { useState } from 'react';
import CustomerForm from './components/CustomerForm';
import CustomerDetails from './components/CustomerDetails';
import ProductList from './components/ProductList'; // Import ProductList component

function App() {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const handleCustomerCreated = (id) => {
    setSelectedCustomerId(id);
  };

  return (
    <div>
      <h1>E-commerce App</h1>
      
      {/* Customer Form and Details */}
      <CustomerForm onCustomerCreated={handleCustomerCreated} />
      {selectedCustomerId && <CustomerDetails customerId={selectedCustomerId} />}

      {/* Product Creation and Listing */}
      <ProductList /> {/* Render Product List component here */}
    </div>
  );
}

export default App;
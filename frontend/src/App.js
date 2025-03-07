import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import CustomerForm from './components/CustomerForm';
import CustomerDetails from './components/CustomerDetails';
import ProductList from './components/ProductList';

function App() {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    console.log("App loaded");
  }, []);

  const handleCustomerCreated = (id) => {
    setSelectedCustomerId(id);
  };

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={
            <div className="d-flex justify-content-center">
              <div className="card p-4 shadow-lg text-center w-75">
                <h1 className="text-primary">Welcome to the E-commerce App</h1>
                <p className="lead">Manage your customers and products efficiently.</p>
              </div>
            </div>
          } />

          {/* Customers Page */}
          <Route path="/customers" element={
            <div className="row">
              <div className="col-md-6">
                <div className="card p-3 shadow">
                  <h2 className="text-success">Add a New Customer</h2>
                  <CustomerForm onCustomerCreated={handleCustomerCreated} />
                </div>
              </div>
              <div className="col-md-6">
                {selectedCustomerId && (
                  <div className="card p-3 shadow">
                    <h2 className="text-info">Customer Details</h2>
                    <CustomerDetails customerId={selectedCustomerId} />
                  </div>
                )}
              </div>
            </div>
          } />

          {/* Products Page */}
          <Route path="/products" element={
            <div className="card p-3 shadow">
              <h2 className="text-warning">Product List</h2>
              <ProductList />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
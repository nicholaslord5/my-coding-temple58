# E-commerce Web Application

## Overview
This is a simple full-stack e-commerce web application built with React, Flask, and MySQL. It allows users to manage customers and products in an e-commerce platform. Users can create, read, update, and delete customer and product data via a simple interface.

## Features
- **Customer Management:** 
  - Create, read, update, and delete customer information.
- **Product Management:** 
  - Add new products, view existing products, and manage product data.
- **Frontend:** 
  - React components for customer and product management.
- **Backend:** 
  - Flask API to handle data storage, retrieval, and manipulation.
  
## Technology Stack
- **Frontend:**
  - React
  - React-Bootstrap for styling and UI components
- **Backend:**
  - Flask
  - Flask-SQLAlchemy for ORM-based database management
  - MySQL
- **Additional Libraries:**
  - Flask-CORS for cross-origin requests
  - Axios (for frontend API requests)

## Setup and Installation

### Backend (Flask API)
1. Clone the repository.
2. Install the required Python dependencies.
    ```bash
    pip install -r requirements.txt
    ```
3. Set up the database (MySQL) and configure the connection in `config.py`.
4. Run the backend application:
    ```bash
    python3 app.py
    ```
   The backend should now be running on `http://127.0.0.1:5000`.

### Frontend (React)
1. Navigate to the `frontend` folder.
2. Install the required JavaScript dependencies.
    ```bash
    npm install
    ```
3. Start the frontend development server:
    ```bash
    npm start
    ```
   The frontend should now be running on `http://localhost:3000`.

## API Endpoints
- **Customer Management:**
  - `POST /api/customers`: Create a new customer.
  - `GET /api/customers/{id}`: Get customer details by ID.
  - `PUT /api/customers/{id}`: Update customer information by ID.
  - `DELETE /api/customers/{id}`: Delete a customer by ID.

- **Product Management:**
  - `POST /api/products`: Create a new product.
  - `GET /api/products`: Get a list of all products.

## Usage
1. Use the frontend to add customers and products.
2. View customer details and products.
3. Use the app to update or delete customers and products as needed.

## Contributing
Feel free to fork this repository, open issues, or submit pull requests to enhance the application!

## License
This project is licensed under the MIT License.

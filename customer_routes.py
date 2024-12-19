from flask import request, jsonify
from config import db
from models import Customer

# CREATE CUSTOMER
@app.route('/customers', methods=['POST'])
def create_customer():
    try:
        data = request.get_json()
        customer = Customer(name=data['name'], email=data['email'], phone=data['phone'])
        db.session.add(customer)
        db.session.commit()
        return jsonify({'message': 'Customer created successfully', 'id': customer.id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# READ CUSTOMER
@app.route('/customers/<int:id>', methods=['GET'])
def get_customer(id):
    customer = Customer.query.get(id)
    if not customer:
        return jsonify({'message': 'Customer not found'}), 404
    return jsonify({'id': customer.id, 'name': customer.name, 'email': customer.email, 'phone': customer.phone})

# UPDATE CUSTOMER
@app.route('/customers/<int:id>', methods=['PUT'])
def update_customer(id):
    data = request.get_json()
    customer = Customer.query.get(id)
    if not customer:
        return jsonify({'message': 'Customer not found'}), 404
    customer.name = data.get('name', customer.name)
    customer.email = data.get('email', customer.email)
    customer.phone = data.get('phone', customer.phone)
    db.session.commit()
    return jsonify({'message': 'Customer updated successfully'})

# DELETE CUSTOMER
@app.route('/customers/<int:id>', methods=['DELETE'])
def delete_customer(id):
    customer = Customer.query.get(id)
    if not customer:
        return jsonify({'message': 'Customer not found'}), 404
    db.session.delete(customer)
    db.session.commit()
    return jsonify({'message': 'Customer deleted successfully'})

from flask import Blueprint, request, jsonify
from config import db
from models import Customer

customer_bp = Blueprint('customer', __name__)

@customer_bp.route('/customers', methods=['POST'])
def create_customer():
    data = request.get_json()
    try:
        customer = Customer(
            name=data['name'],
            email=data['email'],
            phone=data['phone']
        )
        db.session.add(customer)
        db.session.commit()
        return jsonify({'message': 'Customer created', 'id': customer.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
from flask import Blueprint, request, jsonify
from config import db

account_bp = Blueprint('account', __name__)

class CustomerAccount(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)

@account_bp.route('/accounts', methods=['POST'])
def create_account():
    data = request.get_json()
    try:
        account = CustomerAccount(
            username=data['username'],
            password=data['password'],
            customer_id=data['customer_id']
        )
        db.session.add(account)
        db.session.commit()
        return jsonify({'message': 'Account created', 'id': account.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

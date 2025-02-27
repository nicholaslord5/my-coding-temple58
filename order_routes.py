from flask import Blueprint, request, jsonify
from config import db
from models import Order, order_products

order_bp = Blueprint('order', __name__)

@order_bp.route('/orders', methods=['POST'])
def place_order():
    data = request.get_json()
    try:
        order = Order(customer_id=data['customer_id'])
        db.session.add(order)
        db.session.flush()
        for product_id in data['product_ids']:
            order_product = order_products(order_id=order.id, product_id=product_id)
            db.session.add(order_product)
        db.session.commit()
        return jsonify({'message': 'Order placed', 'id': order.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

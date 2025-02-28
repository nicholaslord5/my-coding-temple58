from flask import Blueprint, request, jsonify
from config import db
from models import Order, order_products, Product

order_bp = Blueprint('order', __name__)

@order_bp.route('/orders', methods=['POST'])
def place_order():
    data = request.get_json()
    try:
        order = Order(customer_id=data['customer_id'])
        db.session.add(order)
        db.session.flush()  # Get order.id before commit

        for product_id in data['product_ids']:
            db.session.execute(order_products.insert().values(order_id=order.id, product_id=product_id))

        db.session.commit()
        return jsonify({'message': 'Order placed', 'id': order.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@order_bp.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    return jsonify([
        {'id': order.id, 'customer_id': order.customer_id, 'order_date': order.order_date, 'status': order.status}
        for order in orders
    ]), 200

@order_bp.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = Order.query.get_or_404(order_id)
    return jsonify({
        'id': order.id,
        'customer_id': order.customer_id,
        'order_date': order.order_date,
        'status': order.status,
        'products': [product.id for product in order.products]
    }), 200

@order_bp.route('/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    order = Order.query.get_or_404(order_id)
    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': 'Order deleted'}), 200

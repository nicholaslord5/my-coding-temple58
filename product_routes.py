from flask import Blueprint, request, jsonify
from config import db
from models import Product

product_bp = Blueprint('product', __name__)

@product_bp.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()
    try:
        product = Product(
            name=data['name'],
            price=data['price'],
            stock=data.get('stock', 0)
        )
        db.session.add(product)
        db.session.commit()
        return jsonify({'message': 'Product created', 'id': product.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@product_bp.route('/products', methods=['GET'])
def get_products():
    try:
        products = Product.query.all()
        products_data = [{'id': p.id, 'name': p.name, 'price': p.price, 'stock': p.stock} for p in products]
        return jsonify(products_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

from flask import Flask
from flask_cors import CORS
from config import db, SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS
from customer_routes import customer_bp
from product_routes import product_bp
from order_routes import order_bp

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODIFICATIONS

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

db.init_app(app)

app.register_blueprint(customer_bp, url_prefix='/api')
app.register_blueprint(product_bp, url_prefix='/api')
app.register_blueprint(order_bp, url_prefix='/api')

@app.route('/')
def home():
    return {'message': 'Welcome to the Ecommerce API!'}, 200

@app.route('/api/customers/<int:id>', methods=['GET', 'PUT'])
def manage_customer(id):
    customer = Customer.query.get_or_404(id)
    if request.method == 'GET':
        return {'id': customer.id, 'name': customer.name, 'email': customer.email, 'phone': customer.phone}, 200

@app.route('/api/customers/<int:id>', methods=['DELETE'])
def delete_customer(id):
    customer = Customer.query.get_or_404(id)
    try:
        db.session.delete(customer)
        db.session.commit()
        return {'message': 'Customer deleted!'}, 200
    except Exception as e:
        db.session.rollback()
        return {'error': str(e)}, 500
    
@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get_or_404(id)
    try:
        db.session.delete(product)
        db.session.commit()
        return {'message': 'Product deleted!'}, 200
    except Exception as e:
        db.session.rollback()
        return {'error': str(e)}, 500

@app.route('/api/products/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get_or_404(id)
    data = request.get_json()
    try:
        product.name = data.get('name', product.name)
        product.price = data.get('price', product.price)
        product.stock = data.get('stock', product.stock)
        db.session.commit()
        return {'message': 'Product updated!'}, 200
    except Exception as e:
        db.session.rollback()
        return {'error': str(e)}, 500


if __name__ == '__main__':
    print("Starting Flask app...")
    with app.app_context():
        print("Creating database tables...")
        db.create_all()
        print("Tables created.")
    app.run(debug=True)
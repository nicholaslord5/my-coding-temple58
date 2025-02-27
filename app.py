from config import init_app, db
from account_routes import account_bp
from customer_routes import customer_bp
from order_routes import order_bp
from product_routes import product_bp

app = init_app()

app.register_blueprint(account_bp, url_prefix='/api')
app.register_blueprint(customer_bp, url_prefix='/api')
app.register_blueprint(order_bp, url_prefix='/api')
app.register_blueprint(product_bp, url_prefix='/api')

if __name__ == '__main__':
    with app.app_context():
       db.create_all()
    app.run(debug=True)
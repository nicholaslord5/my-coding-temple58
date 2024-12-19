from config import init_app
from models import db
from routes import customer_routes, account_routes, product_routes, order_routes

app = init_app()

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)

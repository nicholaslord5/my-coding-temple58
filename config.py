from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DB_NAME = "ecommerce.db"

SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://nicholaslord:password@localhost/ecommerce_db'
SQLALCHEMY_TRACK_MODIFICATIONS = False
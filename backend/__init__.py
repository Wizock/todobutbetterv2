from authlib.integrations.flask_client import OAuth
from flask_login.login_manager import LoginManager
from flask_sqlalchemy import SQLAlchemy
from backend.API.authapi import auth
from datetime import timedelta
from flask_cors import CORS
import flask_cors
from flask import Flask
import flask_praetorian
from datetime import timedelta
from flask_jwt_extended import JWTManager
from secrets import token_urlsafe
from random import randint
def create_app():
    secret_len = randint(50, 100)
    appvar = Flask(__name__)
    appvar.secret_key = str(token_urlsafe(secret_len))
    appvar.register_blueprint(auth)
    appvar.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database/todobutbetter.sqlite3'
    appvar.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    secret_len = randint(50, 100)
    appvar.config["JWT_SECRET_KEY"] = str(token_urlsafe(secret_len))
    CORS(appvar, resources={
        r'/*': {
            'origins': '*',
            'methods': ["OPTIONS", "GET", "POST"],
            "allow_headers": ["Authorisation"]
            }
        })
    appvar.config['CORS_HEADERS'] = 'Content-Type'
    appvar.config['SESSION_COOKIE_NAME'] = 'google-login-session'
    appvar.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)
    appvar.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
    appvar.config['JWT_REFRESH_LIFESPA'] = {'days': 30}
    return appvar

app = create_app()
cors = flask_cors.CORS()
with app.app_context():
    oauth = OAuth(app)
    cors = flask_cors.CORS()
    db = SQLAlchemy(app)
    jwt = JWTManager(app)
    from backend.models import _localuser
    guard = flask_praetorian.Praetorian(app, _localuser)
    db.create_all()
    


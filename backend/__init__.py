
from authlib.integrations.flask_client import OAuth
from flask_login.login_manager import LoginManager
from flask_sqlalchemy import SQLAlchemy
from backend.API.auth_api import auth
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
    appvar = Flask(__name__)
    appvar.secret_key = r"33pay9V7FYhHGpZOO_-KOOTS6saVUI-Si6tZKPQiuSvQk8Y9CBt8yatkIgNd1CkW2_tukyn6VfdNba67_h0PgO0vbvk2A2BSlPE6K1c4OFM_cPwHCIH_7HxI_MqUbBpVuds9dVHAfxH-fzGXo_rc-B7KJNciaI6H3ktNB_Zn_Xw"
    appvar.register_blueprint(auth)
    appvar.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database/todobutbetter.sqlite3'
    appvar.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    appvar.config["JWT_SECRET_KEY"] = str(r"mIckCdpWcu75jCe6db8qLV9glgNVeoxQVKaFoZKtgE9AQwGEjHTsQZJkCWLnvs4JZzock_Gu4-1pqXCBlSVRr_pfIn64YhYShAGIidVwW-XOrYv3L9SYjnaBUl0CGq9zDKZLN1jrxQdgvW3JrRjTOD2BvvhQv31SvCjtBEC2vgw")
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
with app.app_context():
    oauth = OAuth(app)
    cors = flask_cors.CORS(app)
    guard = flask_praetorian.Praetorian()
    db = SQLAlchemy(app)
    from backend.models import _localuser
    jwt = JWTManager(app)
    guard.init_app(app, _localuser)
    db.create_all()


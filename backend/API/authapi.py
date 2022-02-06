
import json
from flask.helpers import url_for
from werkzeug.security import check_password_hash
from flask import Blueprint, request, jsonify, redirect, url_for, session
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.utils import redirect
from flask_session import Session
from authlib.integrations.flask_client import OAuth 
from flask_cors import cross_origin
from datetime import timedelta

auth = Blueprint('authentication', __name__)
from backend.__init__ import db, oauth
from backend.models import _localuser
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

# google = oauth.register(
#     name = 'google',
#     client_id = "1051638467361-9u2jc677sacg293dg1hso07bnkt0eagt.apps.googleusercontent.com",
#     client_secret = "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",
#     access_token_url = "https://accounts.google.com/o/oauth2/token",
#     access_token_params = None,
#     authorize_url = 'https://accounts.google.com/o/oauth2/auth',
#     authorize_params = None,
#     api_base_url = 'https://www.googleapis.com/oauth2/v1/',
#     userinfo_endpoint = 'https://openidconnect.googleapis.com/v1/userinfo',
#     client_kwargs={
#         'scope': 'openid email profile'
#     }
# )

@auth.before_request
def make_session_permanent():
    session.permanent = True
    
@auth.route('/register',methods=['POST','OPTIONS','GET'])
@cross_origin()
def register():
    if request.method=="POST":
        email    =  request.json['email'] 
        username =  request.json['username']
        password =  request.json['password']
        data = jsonify(request.json)
        data.headers.add('Access-Control-Allow-Origin', '*')
        userReg = _localuser(email,username,password)
        db.session.add(userReg)
        db.session.commit()
        data = jsonify(request.json)
        data.headers.add('Access-Control-Allow-Origin', '*')
        print('succesful register')
        return redirect('localhost:3000/login')
    if request.method=="GET":
        return "this is the register route from the auth api <br><br><br> this is the address https://127.0.0.1:5000/register"


@auth.route('/token', methods=['POST','OPTIONS','GET'])
@cross_origin()
def login_route():
    if request.method == 'POST':
        username = request.json['username']
        password = request.json['password']
        data = jsonify(request.json)
        data.headers.add('Access-Control-Allow-Origin', '*')
        currentUser = _localuser.query.filter_by(username=username).first()
        if currentUser and currentUser.verify_password(password):
            currentUser.is_active = True
            login_user(currentUser)
            access_token = create_access_token(identity=username)
            return jsonify({"access_token":access_token})
        else:
            return jsonify({"msg":"bad username or password"}), 401
    if request.method == "GET":
        return "You didnt post"

@auth.route('/user')
def user():

    return current_user.username

@auth.route('/logout')
def logout():
    logout_user()
    return redirect('/googlelogout')
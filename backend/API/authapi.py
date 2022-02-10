
from flask import Blueprint, render_template, request, jsonify, redirect, url_for, session
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.utils import redirect
from flask_cors import cross_origin

auth = Blueprint('authentication', __name__)
from backend.__init__ import db, oauth
from backend.models import _localuser
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

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
        print('successful register')
        return redirect('localhost:3000/login')
    if request.method=="GET":
        return "this is the register route from the auth api <br><br><br> this is the address https://127.0.0.1:5000/register"

def set_user_session(user):
    session['user'] = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
    }

@auth.route('/token', methods=['POST','OPTIONS','GET'])
@cross_origin()
def login_route():
    if request.method == 'POST':
        queried_username = request.json['username']
        queried_password = request.json['password']
        data = jsonify(request.json)
        data.headers.add('Access-Control-Allow-Origin', '*')
        currentUser = _localuser.query.filter_by(username=queried_username).first()
        if currentUser and currentUser.verify_password(queried_password):
            set_user_session(currentUser)
            login_user(currentUser)
            print(current_user)   
            if currentUser.is_authenticated:
                access_token = create_access_token(identity=queried_username, fresh=True)
                return jsonify({"msg": "logged in","access_token":access_token} ), 200
        else:
            return jsonify({"msg":"bad username or password"}), 401
    if request.method == "GET":
        return "You didnt post"

@auth.route('/session', methods=['POST','OPTIONS','GET'])
@cross_origin(origin='*',headers=['Content-Type','application/json'])
def check_session():
    if current_user.is_authenticated:
        if not('user' in session):
            set_user_session(current_user)
        user_sess = {
            'username': session['user']["username"],
            "email": session['user']["email"]
        }
    else:
        user_sess = {
            'username': "",
            'email' : "",
        }
    return {
        'authenticated': current_user.is_authenticated, 
        'user': user_sess
    }


@auth.route('/get_user', methods=['POST','OPTIONS','GET'])
@cross_origin(origin='*',headers=['Content-Type','application/json'])
def fetch_user():
    return str(current_user.username)

@auth.route('/logout')
def logout():
    logout_user()
    return redirect('/googlelogout')
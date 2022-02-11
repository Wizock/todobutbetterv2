
from flask import Blueprint, render_template, request, jsonify, redirect, url_for, session
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.utils import redirect
from flask_cors import cross_origin
import flask_praetorian
auth = Blueprint('authentication', __name__)
from backend.__init__ import db, oauth, guard
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
        return 200
    if request.method=="GET":
        return "this is the register route from the auth api <br><br><br> this is the address https://127.0.0.1:5000/register"

@auth.route('/login', methods=['POST','OPTIONS','GET'])
@cross_origin()
def login_route():
    if request.method == 'POST':
        queried_username = request.json['username']
        queried_password = request.json['password']
        data = jsonify(request.json)
        data.headers.add('Access-Control-Allow-Origin', '*')
        user_query = guard.authenticate(queried_username, queried_password)
        if user_query:
            print(user_query)
            gen_jwt = guard.encode_jwt_token(user_query)
            return jsonify({'access_token':gen_jwt}), 200
    if request.method == "GET":
        return "You didnt post"


@auth.route('/protected')
@flask_praetorian.auth_required
def protected():
    return jsonify(
        {
            'message': f"protected endpoint (allowed user {flask_praetorian.current_user().username})"
        }
    )

@auth.route('/get_user')
@flask_praetorian.auth_required
def user_query_route():
    return jsonify(
        {
            'id': f"{flask_praetorian.current_user().id})",
            'username': f"{flask_praetorian.current_user().username})",
            'email': f"{flask_praetorian.current_user().email})",

        }
    )


@auth.route('/logout')
def logout():
    logout_user()
    return redirect('/googlelogout')
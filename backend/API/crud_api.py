
from flask import Blueprint, request, jsonify, redirect, session
from werkzeug.utils import redirect
from flask_cors import cross_origin
import flask_praetorian, time

crud = Blueprint('crud_routes', __name__)
from backend.__init__ import db
from backend.models import task_dispatch

@crud.route('/create_task',methods=['POST','OPTIONS','GET'])
@flask_praetorian.auth_required
@cross_origin()
def create_task():
    if request.method=="POST":
        task_owner = flask_praetorian.current_user().username
        creation_date = time.strftime('%H:%M:%S')
        due_time = request.json['due_time']        
        activity = request.json['activity']
        urgency = request.json['urgency']
        data = jsonify(request.json)
        data.headers.add('Access-Control-Allow-Origin', '*')
        task_creation = task_dispatch(task_owner,activity,creation_date,due_time,urgency)
        db.session.add(task_creation)
        db.session.commit()
        data = jsonify(request.json)
        data.headers.add('Access-Control-Allow-Origin', '*')
        return 200

    if request.method=="GET":
        tasks = task_dispatch.query.filter_by(username=flask_praetorian.current_user().username)
        tasks.headers.add('Access-Control-Allow-Origin', '*')
        return  jsonify({'elements': tasks})

from flask import Blueprint, request, jsonify
from backend.models import task_dispatch
from flask_cors import cross_origin
from backend.__init__ import db
import flask_praetorian
import time

crud = Blueprint('crud_api', __name__)


@crud.route('/task/create',methods=['POST','OPTIONS'])
@flask_praetorian.auth_required
@cross_origin()
def create_task():
    if request.method=="POST":
        task_owner = flask_praetorian.current_user().username
        print(task_owner)
        creation_date = time.strftime('%H:%M:%S')
        title = request.json['title']
        description = request.json['description']
        priority = request.json['priority']
        starting_date_value = request.json['starting_date_value'] 
        due_date_value = request.json['due_date_value']
        due_time_value = request.json['due_time_value']
        data = jsonify(request.json)
        data.headers.add('Access-Control-Allow-Origin', '*')
        task_creation = task_dispatch(task_owner,creation_date,title,description,priority,starting_date_value,due_date_value,due_time_value,)
        db.session.add(task_creation)
        db.session.commit()
        data = jsonify(request.json)
        data.headers.add('Access-Control-Allow-Origin', '*')
        return 200

@crud.route('/task/show',methods=['GET','OPTIONS'])
@flask_praetorian.auth_required
@cross_origin()
def show_task():
    if request.method=="GET":
        tasks = task_dispatch.query.filter_by(username=flask_praetorian.current_user().username)
        tasks.headers.add('Access-Control-Allow-Origin', '*')
        return  jsonify({'elements': tasks})


@crud.route('/task/delete',methods=['DELETE','OPTIONS'])
@flask_praetorian.auth_required
@cross_origin()
def delete_task():
    if request.method=="DELETE":
        task_id = request.json['task_id']
        task_delete = task_dispatch.query.filter_by(task_id=task_id).first()
        db.session.delete(task_delete)
        db.session.commit()
        return 200


@crud.route('/task/update',methods=['PUT','OPTIONS'])
@flask_praetorian.auth_required
@cross_origin()
def update_task():
    if request.method=="PUT":
        task_id = request.json['task_id']
        task_update = task_dispatch.query.filter_by(task_id=task_id).first()
        task_update.activity = request.json['activity']
        task_update.due_time = request.json['due_time']
        task_update.urgency = request.json['urgency']
        db.session.commit()
        return 200


@crud.route('/task/show/<int:task_id>',methods=['GET','OPTIONS'])
@flask_praetorian.auth_required
@cross_origin()
def show_task_id(task_id):
    if request.method=="GET":
        task_id = task_dispatch.query.filter_by(task_id=task_id).first()
        task_id.headers.add('Access-Control-Allow-Origin', '*')
        return jsonify({'elements': task_id})
    



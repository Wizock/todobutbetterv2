import time

import flask_praetorian
from flask import Blueprint, Response, jsonify, request
from flask_cors import cross_origin

from backend.__init__ import db
from backend.models import task_dispatch

crud = Blueprint("crud_api", __name__)


@crud.route("/task/create", methods=["POST", "OPTIONS"])
@cross_origin()
@flask_praetorian.auth_required
def create_task():
    if request.method == "POST":
        task_owner = flask_praetorian.current_user().username
        print(request.json)
        title = request.json["title"]
        description = request.json["description"]
        priority = request.json["priority"]
        starting_date_value = request.json["startingDateValue"]
        due_date_value = request.json["dueDateValue"]
        due_time_value = request.json["dueTimeValue"]
        task_creation = task_dispatch(
            task_owner,
            title,
            description,
            priority,
            starting_date_value,
            due_date_value,
            due_time_value,
        )
        db.session.add(task_creation)
        db.session.commit()
        return Response("{'a':'b'}", status=200, mimetype="application/json")
    else:
        return Response("{'a':'b'}", status=200, mimetype="application/json")


@crud.route("/task/show", methods=["GET", "OPTIONS"])
@cross_origin()
@flask_praetorian.auth_required
def show_task():
    if request.method == "GET":
        tasks_query = task_dispatch.query.filter_by(
            task_owner=flask_praetorian.current_user().username
        ).all()
        tasks_list = []
        for task in tasks_query:
            tasks_list.append(
                {
                    "taskOwner": task.task_owner,
                    "id": task.id,
                    "title": task.title,
                    "description": task.description,
                    "priority": task.priority,
                    "startingDateValue": task.starting_date_value,
                    "dueDateValue": task.due_date_value,
                    "dueTimeValue": task.due_time_value,
                }
            )
        # print(tasks_list)

        # tasks_list.headers.add('Access-Control-Allow-Origin', '*')
        return jsonify(tasks_list), 200

    #     return  jsonify({'elements': tasks})
    # else:
    #     return Response("{'a':'b'}", status=200, mimetype='application/json')


@crud.route("/task/delete", methods=["DELETE", "OPTIONS"])
@flask_praetorian.auth_required
@cross_origin()
def delete_task():
    if request.method == "DELETE":
        task_id = request.json["task_id"]
        task_delete = task_dispatch.query.filter_by(task_id=task_id).first()
        db.session.delete(task_delete)
        db.session.commit()
        return 200


@crud.route("/task/update", methods=["PUT", "OPTIONS"])
@flask_praetorian.auth_required
@cross_origin()
def update_task():
    if request.method == "PUT":
        task_id = request.json["task_id"]
        task_update = task_dispatch.query.filter_by(task_id=task_id).first()
        task_update.activity = request.json["activity"]
        task_update.due_time = request.json["due_time"]
        task_update.urgency = request.json["urgency"]
        db.session.commit()
        return 200


@crud.route("/task/show/<int:task_id>", methods=["GET", "OPTIONS"])
@flask_praetorian.auth_required
@cross_origin()
def show_task_id(task_id):
    if request.method == "GET":
        task_id = task_dispatch.query.filter_by(task_id=task_id).first()
        task_id.headers.add("Access-Control-Allow-Origin", "*")
        return jsonify({"elements": task_id})
